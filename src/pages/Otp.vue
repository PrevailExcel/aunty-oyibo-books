<script setup>
import { ref, onBeforeUnmount, watch } from "vue";
import axios from "axios";
import Auth from "../Auth";
import Swal from 'sweetalert2';
import { useRouter, useRoute } from "vue-router";
import Loader from "../components/Loader.vue";

const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
const wrong = ref(false);
const inputs = ["input1", "input2", "input3", "input4"];
const otpValues = ref(Array(inputs.length).fill(""));
const focusedIndex = ref(0);
const isButtonEnabled = ref(false);


const showToast = (msg) => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'error',
    title: msg,
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
};


const handleInput = (index, event) => {
  const value = event.target.value;
  if (value >= 0 && value <= 9) {
    otpValues.value[index] = value;

    const nextIndex = index + 1;
    if (nextIndex < inputs.length) {
      focusedIndex.value = nextIndex;
      document.getElementById(inputs[focusedIndex.value]).focus();
    }
  } else {
    otpValues.value[index] = "";
  }

  if (
    event.inputType === "deleteContentBackward" ||
    event.inputType === "deleteContentForward"
  ) {
    wrong.value = false;
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      focusedIndex.value = prevIndex;
      document.getElementById(inputs[focusedIndex.value]).focus();
    } else {
      const firstInput = document.getElementById(inputs[0]);
      if (firstInput) firstInput.focus();
    }
  }
};

const countdown = ref(60);
let timer = null;

const startCountdown = () => {
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
};
startCountdown();

const resendCode = async () => {
  // Your resend email logic here;
  isLoading.value = true;
  const user = JSON.parse(window.localStorage.getItem('user'));
  console.log(user.email)
  try {
    const response = await axios.post('/resend-otp', {  //
      email: user.email,
    });

    if (response.status === 200) {
      isLoading.value = false;
      clearInterval(timer);
    } else {
      console.error('Error:', response.statusText);

      isLoading.value = false;
    }
  } catch (error) {
    isLoading.value = false;
    showToast(error.response.data.error ?? error.message,)
    console.error('Error:', error);
  }

  // For demonstration purposes, let's just reset the countdown
  countdown.value = 60;
  if (!timer) {
    startCountdown();
  }
};

onBeforeUnmount(() => {
  clearInterval(timer);
});

const verify = () => {
  wrong.value = false;
  const otp = otpValues.value.join("");
  verifyOTP(otp);
};

const verifyOTP = async (otp) => {

  isLoading.value = true;
  try {

  let userr = JSON.parse(window.localStorage.getItem('user'));
  console.log(userr.email)
    const response = await axios.post('/verify-otp', {  //
      otp: otp,
      email: userr.email
    });

    if (response.status === 200 && response.data.success == true) {
      isLoading.value = false;
      router.push("/set-password");
    } else {
      showToast(response.data.error)
      wrong.value = true;
      console.error('Error:', response.status);

      isLoading.value = false;
    }
  } catch (error) {
    isLoading.value = false;
    showToast(error)
    console.error('Error:', error);
  }
}

watch(otpValues.value, (newValue) => {
  if ((newValue.every(value => /^[0-9]$/.test(value)))) {
    isButtonEnabled.value = true;
  } else {
    isButtonEnabled.value = false;
  }
});

</script>

<template>
  <div class="container bg-white">
    <div class="py-5 text-center"><img src="/logo-dark.png" width="114" /></div>

    <div class="text-reg">Enter the 4-digit code sent to {{ route.params.phone }}</div>

    <div id="inputs" class="text-center align-item-center mt-5">
      <input v-for="(input, index) in inputs" :key="index" class="otp" pattern="\d*" :id="input" autofocus
        autocomplete="off" type="tel" maxlength="1" @input="handleInput(index, $event)" ref="otpInputs"
        :ref="'input_' + index" />
    </div>

    <div class="text-error text-center mt-1" v-if="wrong">
      Wrong code. Please try again
    </div>

    <div class="text-reg text-60 text-center mt-3">

      <span @click="resendCode" :disabled="countdown > 0"
        :style="{ color: countdown > 0 ? 'gray' : 'var(--blue)', cursor: countdown > 0 ? 'not-allowed' : 'pointer' }">
        {{ countdown > 0 ? `Send code again 00:${countdown}` : 'Resend Code' }}
      </span>
    </div>

    <button type="submit" class="btn btn-primary w-100 my-4 py-2 px-5 fw-bold" :disabled="!isButtonEnabled"
      :class="{ 'bg-40': !isButtonEnabled }" @click="verify()">
      Verify
    </button>
  </div>

  <Loader v-if="isLoading"></Loader>

</template>
