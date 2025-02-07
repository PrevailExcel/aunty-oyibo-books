<script setup>

import { ref } from 'vue';
import axios from 'axios';
import Auth from '../Auth';
import { useRouter } from 'vue-router';
import Loader from '../components/Loader.vue';
import Swal from 'sweetalert2';

const router = useRouter();
const formData = ref({
    name: "",
    phone: "",
    email: "",
    refcode: "",
});
const isLoading = ref(false);
const showVerifyModal = ref(false);



const loginUser = async () => {

    isLoading.value = true;
    try {
        const response = await axios.post('/register', {  //
            name: formData.value.name,
            phone: formData.value.phone,
            email: formData.value.email,
            ref_code: formData.value.refcode,
        });

        if (response.status === 200) {
            localStorage.setItem('regForm', JSON.stringify(formData.value))
            isLoading.value = false;
            localStorage.setItem('user', JSON.stringify(response.data.data))
            showVerifyModal.value = true
        } else {
            console.error('Error:', response.statusText);
            isLoading.value = false;

        }
    } catch (error) {
        if (error.response.status === 422) {
            let errors = error.response.data.errors;
            Object.keys(errors).forEach(field => {
                console.log(field);
                
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

                isLoading.value = false;
            });
        } else {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: error.response.statusText,
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
        isLoading.value = false;
    }
}

// Function to show the Bootstrap modal
const showModal = () => {
    // Get the modal element
    const modal = new bootstrap.Modal(document.getElementById('verifyModal'));
    // Show the modal
    modal.show();
};
</script>

<template>
    <div class="container bg-white">

        <div class="py-5 text-center"><img src="/logo-dark.png" width="114"></div>

        <span class="lato-bold">Create an account</span>
        <div class="text-reg pt-1">Sign up to register</div>
        <form class="row g-3 mt-3" @submit.prevent="loginUser">
            <div class="d-grid">
                <div class="mt-1 row">
                    <div class="col-12 mb-2">
                        <label class="form-label text-small text-80">Full Name:</label>
                        <div class="position-relative login-form">
                            <input type="text" required v-model="formData.name" class="form-control form-control-lg">
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <label class="form-label text-small text-80">Phone Number:</label>
                        <div class="position-relative login-form">
                            <input type="tel" required v-model="formData.phone" maxlength="11" pattern="\d*"
                                class="form-control form-control-lg">
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <label class="form-label text-small text-80">Email Address:</label>
                        <div class="position-relative login-form">
                            <input type="email" required v-model="formData.email" class="form-control form-control-lg">
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <label class="form-label text-small text-80">Referral Code (Optional):</label>
                        <div class="position-relative login-form">
                            <input type="text" v-model="formData.refcode" class="form-control form-control-lg">
                        </div>
                    </div>

                    <div class="text-center text-small mt-3 px-5">
                        By registering, I agree to <span class="text-blue">Digixcel Terms & Conditions and Privacy
                            Policy</span>.
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-lg w-100 my-4" :disabled="!formData.email"
                    :class="{ 'bg-40': !formData.email }">Next</button>
                <div class="text-center text-reg my-2 mb-5">
                    <div>Have an account? <span class="text-blue" @click="router.push('/login')">Sign in</span></div>
                </div>
            </div>
        </form>


        <Loader v-if="isLoading"></Loader>

        <div v-if="showVerifyModal">
            <div class="custom-modal-overlay">
                <div class="custom-modal">
                    <div class="container modal-content">
                        <div class="modal-body">
                            <div class="text-reg bold fw-bold mb-2">Verify your phone number</div>
                            <p class="text-small text-80">A verification code has been sent to your phone number.</p>

                            <div class="text-center">
                                <button @click="router.push({ path: '/otp/' + formData.phone })" type="button"
                                    class="text-center py-2 btn btn-primary px-5 text-small mt-2">Verify</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>