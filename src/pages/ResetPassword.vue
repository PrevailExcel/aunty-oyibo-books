<script setup>
import { ref } from "vue";
import axios from "axios";
import Auth from "../Auth";
import Loader from '../components/Loader.vue';
import { useRouter } from "vue-router";

const router = useRouter();
const password = ref("");
const confirmpassword = ref("");
const passwordCorrect = ref();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const showVerifyModal = ref(false)

const togglePassword = () => {
    showPassword.value = !showPassword.value
}
const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value
}

const loginUser = async () => {

    isLoading.value = true;
    try {
        const response = await axios.post('/auth/login', {  //
            username: "emilys", //account.value,
            password: "emilyspass" //password.value
        });

        if (response.status === 200) {
            setTimeout(() => {
                isLoading.value = false;
                Auth.login(response.data.token, response.data);
                showVerifyModal.value = true
                setTimeout(() => {
                    router.push('/home');
                }, 2000);
            }, 2000);
        } else {
            console.error('Error:', response.statusText);

            isLoading.value = false;
        }
    } catch (error) {
        isLoading.value = false;
        console.error('Error:', error);
    }
}
</script>

<template>
    <div class="container bg-white">
        <div class="py-5 text-center"><img src="/logo-dark.png" width="114" /></div>

        <span class="lato-bold">Reset Password</span>
        <div class="text-reg pt-1">Your new password must be different from previous used ones</div>
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
                        :class="{ 'bg-40': !(password.length >= 8 && confirmpassword == password) }">Reset</button>
                </div>
            </div>
        </form>



        <Loader v-if="isLoading"></Loader>

        <div v-if="showVerifyModal">
            <div class="custom-modal-overlay">
                <div class="custom-modal-2">
                    <div class="container modal-content">
                        <div class="modal-body text-center">
                            <img src="/done.png" class="mb-3">
                            <div class="text-bold fw-bold mb-2">Your password has been reset
                                successfully.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
