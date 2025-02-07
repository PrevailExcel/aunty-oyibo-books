<script setup>
import { ref } from "vue";
import axios from "axios";
import Auth from "../Auth";
import Loader from '../components/Loader.vue';
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';

const router = useRouter();
const password = ref("");
const confirmpassword = ref("");
const passwordCorrect = ref();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value
}
const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value
}

const loginUser = async () => {
    let user = JSON.parse(localStorage.getItem('user'));
    isLoading.value = true;
    try {
        const response = await axios.post('/set-password', {  //
            email: user.email,
            password: password.value
        });

        if (response.status === 200) {
            isLoading.value = false;
            Auth.login(response.data.token, response.data.user);
            requestNotificationPermission()
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: response.data.data.message,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                // background: '#3e3e3e',  // Custom background color
                color: '#08060B',        // Custom text color
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            router.push('/setpin');
        } else {
            console.error('Error:', response.statusText);
            if (response.status === 422) {
                let errors = response.data.errors;
                Object.keys(errors).forEach(field => {
                    errors.forEach(element => {
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'error',
                            title: errors[field][0],
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            // background: '#3e3e3e',  // Custom background color
                            color: '#08060B',        // Custom text color
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        });
                    })
                    toastr.error(errors[field][0]); // Show each error as a toast
                });
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: response.statusText,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    // background: '#3e3e3e',  // Custom background color
                    color: '#08060B',        // Custom text color
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
            }
            errors = response.errors;
            isLoading.value = false;
        }
    } catch (error) {
        isLoading.value = false;
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: error.response.data.error ?? error.message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            // background: '#3e3e3e',  // Custom background color
            color: '#08060B',        // Custom text color
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        console.error('Error:', error);
    }
}
</script>

<template>
    <div class="container bg-white">
        <div class="py-5 text-center"><img src="/logo-dark.png" width="114" /></div>

        <span class="lato-bold">Set Password</span>
        <div class="text-reg pt-1">Sign up to register</div>
        <form class="row g-3 mt-3" @submit.prevent="loginUser">
            <div class="d-grid">
                <div class="mt-1 row">
                    <div class="col-12 mb-3">
                        <label class="form-label text-small">Password:</label>
                        <div class="position-relative login-form">
                            <input minlength="8" :type="showPassword ? 'text' : 'password'" v-model="password"
                                class="form-control form-control-lg"
                                :class="{ 'filled': password, 'wrong': password && password.length < 8 }">
                            <span class="position-absolute" @click="togglePassword"><font-awesome-icon
                                    v-if="showPassword" icon="fa-eye" /><font-awesome-icon v-else
                                    icon="fa-eye-slash" /></span>
                            <div class="mini mt-1" v-if="password.length < 8"
                                :class="{ 'text-error': password, 'text-info': !password }">
                                Must be at least 8 characters
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mb-5">
                        <label class="form-label text-small">Confirm Password:</label>
                        <div class="position-relative login-form">
                            <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmpassword"
                                class="form-control form-control-lg"
                                :class="{ 'filled': confirmpassword, 'wrong': confirmpassword && confirmpassword != password }">
                            <span class="position-absolute" @click="toggleConfirmPassword"><font-awesome-icon
                                    v-if="showConfirmPassword" icon="fa-eye" /><font-awesome-icon v-else
                                    icon="fa-eye-slash" /></span>

                            <div class="mini mt-1" v-if="!confirmpassword || confirmpassword != password"
                                :class="{ 'text-error': confirmpassword, 'text-info': !confirmpassword }">
                                Both passwords must match
                            </div>
                        </div>

                    </div>
                </div>
                <div class="mt-5">
                    <button type="submit" class="btn btn-primary btn-lg w-100 mt-5"
                        :disabled="!(password.length >= 8 && confirmpassword == password)"
                        :class="{ 'bg-40': !(password.length >= 8 && confirmpassword == password) }">Next</button>
                </div>
            </div>
        </form>



        <Loader v-if="isLoading"></Loader>
    </div>
</template>
