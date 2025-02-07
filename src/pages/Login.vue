<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import Auth from '../Auth';
import { useRouter } from 'vue-router';
import Loader from '../components/Loader.vue';
import Swal from 'sweetalert2';

const router = useRouter();
const isOffCanvasOpen = ref(false);
const email = ref("");
const password = ref("");
const passwordCorrect = ref();
const showPassword = ref(false);
const isLoading = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value
}
onMounted(() => {
    isOffCanvasOpen.value = !isOffCanvasOpen.value;
});

const loginUser = async () => {

    isLoading.value = true;
    try {
        const response = await axios.post('/login', {  //
            email: email.value,
            password: password.value
        });

        if (response.status === 200) {
            passwordCorrect.value = true;

            isLoading.value = false;
            Auth.login(response.data.data.token, response.data.data.user);
            router.push('/home');
            requestNotificationPermission()
        } else {
            console.error('Error:', response.statusText);

            isLoading.value = false;
            passwordCorrect.value = false;
        }
    } catch (error) {
        passwordCorrect.value = false;
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
const requestNotificationPermission = async () => {
    try {
        if (!('Notification' in window)) {
            throw new Error('This browser does not support desktop notification');
        }

        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            showNotification('A new device just logged in to your account.');
        } else {
            throw new Error('Notification permission denied');
        }
    } catch (error) {
        console.error('Failed to request notification permission:', error);
    }
};

const showNotification = (message) => {
    new Notification(message);
};
</script>

<template>
    <div style="margin: 0; padding: 0; background: linear-gradient(269.75deg, #19D0FC -550.59%, var(--blue) 107.92%) !important;
;">
        <div class="center-logo"><img class="pb-5" src="/logo.png"></div>

        <div class="offcanvas offcanvas-bottom rounded-top-30" :class="{ 'show': isOffCanvasOpen }" tabindex="-1"
            id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
            <div class="offcanvas-header pt-4">
                <div class="offcanvas-title" id="offcanvasBottomLabel">
                    <span class=" lato-bold">Welcome Back</span>
                    <div class="text-reg pt-1">Sign in to continue</div>
                </div>
            </div>
            <div class="offcanvas-body">
                <form class="row g-3" @submit.prevent="loginUser">
                    <div class="d-grid">
                        <div class="row">
                            <div class="col-12 mb-3">
                                <label class="form-label text-small">Email Address"</label>
                                <div class="position-relative login-form">
                                    <input type="email" v-model="email" class="form-control form-control-lg"
                                        :class="{ 'filled': email }">

                                </div>
                            </div>
                            <div class="col-12 mb-3">
                                <label class="form-label text-small">Password:</label>
                                <div class="position-relative login-form">
                                    <input :type="showPassword ? 'text' : 'password'" v-model="password"
                                        class="form-control form-control-lg"
                                        :class="{ 'filled': password, 'correct': passwordCorrect, 'wrong': passwordCorrect == false }">
                                    <span class="position-absolute" @click="togglePassword"><font-awesome-icon
                                            v-if="showPassword" icon="fa-eye" /><font-awesome-icon v-else
                                            icon="fa-eye-slash" /></span>
                                </div>
                                <div class="d-flex mt-1 justify-content-between align-items-center text-small">
                                    <div class="form-check">
                                        <input class="form-check-input text-small" type="radio" name="flexRadioDefault"
                                            id="flexRadioDefault1">
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            Keep me logged in
                                        </label>
                                    </div>
                                    <div @click="router.push('/forgot-password')" style="padding-top: -2px;">Forgot
                                        password?</div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-lg w-100 mt-1" :disabled="!password"
                            :class="{ 'bg-40': !password }">Log in</button>
                        <div class="text-center text-reg mt-3">
                            <div>Don’t have any account? <span class="text-blue" @click="router.push('/register')">Sign
                                    up</span></div>
                        </div>
                    </div>
                </form>
            </div>

            <Loader v-if="isLoading"></Loader>
        </div>
    </div>
</template>