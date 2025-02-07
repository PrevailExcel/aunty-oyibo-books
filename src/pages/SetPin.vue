<script setup>
import { ref } from "vue";
import axios from "axios";
import Auth from "../Auth";
import Loader from '../components/Loader.vue';
import { useRouter } from "vue-router";

const router = useRouter();
const pin = ref("");
const confirmpin = ref("");
const showPin = ref(false);
const showConfirmPin = ref(false);
const isLoading = ref(false);
const showVerifyModal = ref(false)
const togglePin = () => {
    showPin.value = !showPin.value
}
const toggleConfirmPin = () => {
    showConfirmPin.value = !showConfirmPin.value
}

const notificationPermission = ref(Notification.permission);

const requestNotificationPermission = () => {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
        return;
    }

    Notification.requestPermission().then(permission => {
        notificationPermission.value = permission;
        if (permission === "granted") {
            showNotification("Notification permission granted!");
        } else {
            alert("Notification permission denied.");
        }
    });
};

const showNotification = (message) => {
    new Notification(message);
};

const loginUser = async () => {

    isLoading.value = true;
    try {
        const response = await axios.post('/set-pin', {  //
            pin: pin.value,
        });

        if (response.status === 200) {
            requestNotificationPermission()
            isLoading.value = false;
            showVerifyModal.value = true
            router.push('/home');
        } else {
            console.error('Error:', response.statusText);

            isLoading.value = false;
        }
    } catch (error) {
        isLoading.value = false;
        console.error('Error:', error);
    }
}

function onInput(event) {
    // Filter out non-numeric characters
    const sanitizedValue = event.target.value.replace(/\D/g, '');
    event.target.value = sanitizedValue;
}
function onKeyPress(event) {
    // Allow only numeric characters
    const charCode = event.keyCode || event.which;
    const charStr = String.fromCharCode(charCode);
    if (!/\d/.test(charStr)) {
        event.preventDefault();
    }
}
</script>

<template>
    <div class="container bg-white">
        <div class="py-5 text-center"><img src="/logo-dark.png" width="114" /></div>

        <span class="lato-bold">Set Your Pin</span>
        <div class="text-reg pt-1">A Four-Numerical Code that will be used authenticate your transactions.</div>
        <form class="row g-3 mt-3" @submit.prevent="loginUser">
            <div class="d-grid">
                <div class="mt-1 row">
                    <div class="col-12 mb-3">
                        <label class="form-label text-small">Transaction Pin:</label>
                        <div class="position-relative login-form">
                            <input minlength="4" maxlength="4" type="tel" autocomplete="off" id="pinInput"
                                @input="onInput" @keypress="onKeyPress" v-model="pin"
                                class="form-control form-control-lg"
                                :class="{ 'filled': pin, 'wrong': pin && pin.length < 4, 'show-pin': showPin, 'hide-pin': !showPin }">
                            <span class="position-absolute" @click="togglePin"><font-awesome-icon v-if="showPin"
                                    icon="fa-eye" /><font-awesome-icon v-else icon="fa-eye-slash" /></span>
                            <div class="mini mt-1" v-if="pin && pin.length < 4"
                                :class="{ 'text-error': pin, 'text-info': !pin }">
                                Must be a 4 digit number
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mb-5">
                        <label class="form-label text-small">Confirm Transaction Pin:</label>
                        <div class="position-relative login-form">
                            <input minlength="4" maxlength="4" type="tel" autocomplete="off" id="pinInput"
                                @input="onInput" @keypress="onKeyPress" v-model="confirmpin"
                                class="form-control form-control-lg"
                                :class="{ 'filled': confirmpin, 'wrong': confirmpin && confirmpin != pin, 'show-pin': showConfirmPin, 'hide-pin': !showConfirmPin }">
                            <span class="position-absolute" @click="toggleConfirmPin"><font-awesome-icon
                                    v-if="showConfirmPin" icon="fa-eye" /><font-awesome-icon v-else
                                    icon="fa-eye-slash" /></span>

                            <div class="mini mt-1" v-if="confirmpin && confirmpin != pin"
                                :class="{ 'text-error': confirmpin, 'text-info': !confirmpin }">
                                Both pins must match
                            </div>
                        </div>

                    </div>
                </div>
                <div class="mt-5">
                    <button type="submit" class="btn btn-primary btn-lg w-100 mt-5"
                        :disabled="!(pin.length == 4 && confirmpin == pin)"
                        :class="{ 'bg-40': !(pin.length == 4 && confirmpin == pin) }">Sign up</button>
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
                            <div class="text-bold fw-bold mb-2">Your account has been created successfully.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>