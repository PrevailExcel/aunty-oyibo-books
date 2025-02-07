<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Head from "../components/Head.vue";
import { formatMoney } from "../utils";
import axios from 'axios';
import Loader from "../components/Loader.vue";

const route = useRoute();
const router = useRouter();
const plan = ref();
const provider = ref(null);
const name = ref(null);
const amount = ref();
const type = ref();
const isOffCanvasOpen = ref(false);
const isOffCanvas2Open = ref(false);
const isWarningOpen = ref(false);
const isPinCanvasOpen = ref(false);
const isLoading = ref(false);
const showVerifyModal = ref(false)

const inputs = ["input1", "input2", "input3", "input4"];
const otpValues = ref(Array(inputs.length).fill(""));
const focusedIndex = ref(0);

const openPinModal = () => {
  isOffCanvas2Open.value = false;
  isPinCanvasOpen.value = true;
}

const checkExam = () => {
  if (!(provider.value && provider.value.length > 1)) {
    name.value = null;
    isWarningOpen.value = !isWarningOpen.value;
  }

};

watch(provider, () => {
  if (provider.value == "WAEC")
    amount.value = formatMoney(4000, true)
  else if (provider.value == "NABTEB")
    amount.value = formatMoney(1000, true)
  else if (provider.value == "NECO")
    amount.value = formatMoney(1500, true)
  else
    amount.value = null
});

const sendData = async () => {

  isLoading.value = true;
  try {
    const response = await axios.post('/auth/login', {  //
      username: "emilys", //account.value,
      password: "emilyspass" //password.value
    });

    if (response.status === 200) {
      setTimeout(() => {
        isLoading.value = false;

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

const handleInput = (index, event) => {
  const value = event.target.value;
  if (value >= 0 && value <= 9) {
    otpValues.value[index] = value;

    const nextIndex = index + 1;
    if (nextIndex < inputs.length) {
      focusedIndex.value = nextIndex;
      document.getElementById(inputs[focusedIndex.value]).focus();
    } else {
      if (otpValues.value.every(value => value !== "")) {
        isPinCanvasOpen.value = false;
        sendData()
      }
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

</script>
<template>
  <div class="container bg-white py-3">

    <Head title="Exam"></Head>

    <div class="d-flex justify-content-around my-5 px-3 text-center">
      <input type="radio" v-model="provider" value="WAEC" class="btn-check provider" name="options-outlined"
        id="vid-opt" />
      <label for="vid-opt" class="network-bg p-2">
        <div class="bordered rounded-circle">
          <img width="50" height="40" src="/icons/waec.svg" />
        </div>
        <div class="text-reg b7 mt-2 text-blue">WAEC</div>
      </label>

      <input type="radio" v-model="provider" value="NABTEB" class="btn-check provider" name="options-outlined"
        id="startimes" />
      <label for="startimes" class="network-bg p-2">
        <div class="bordered rounded-circle">
          <img width="50" height="40" src="/icons/nabteb.svg" />
        </div>
        <div class="text-reg b7 mt-2 text-blue">NABTEB</div>
      </label>

      <input type="radio" v-model="provider" value="NECO" class="btn-check provider" name="options-outlined"
        id="startim" />
      <label for="startim" class="network-bg p-2">
        <div class="bordered rounded-circle">
          <img width="50" height="40" src="/icons/neco.svg" />
        </div>
        <div class="text-reg b7 mt-2 text-blue">NECO</div>
      </label>
    </div>

    <div class="row">
      <div class="col-12 mb-2">
        <label class="form-label text-small text-80">Student's Name:</label>
        <div class="position-relative login-form">
          <input @focus.prevent="checkExam()" type="text" minlength="3" v-model="name" required
            :class="{ 'filled': name }" class="form-control form-control-lg" />
        </div>
      </div>
      <div class="col-12 mb-2">
        <label class="form-label text-small text-80">Amount:</label>
        <div class="position-relative login-form">
          <input type="text" disabled v-model="amount" class="form-control form-control-lg" />
        </div>
      </div>
    </div>

    <div class="container fixed-bottom mb-5">
      <button type="button" @click="isOffCanvas2Open = !isOffCanvas2Open;
      " class="btn btn-primary btn-lg w-100 mt-5" :disabled="!amount" :class="{ 'bg-40': !amount }">Proceed</button>

      <div class="w-100 mb-5"></div>
    </div>


    <div class="backdrop" v-if="isOffCanvas2Open || isPinCanvasOpen"></div>

    <div v-if="isWarningOpen">
      <div class="custom-modal-overlay" @click="isWarningOpen = !isWarningOpen">
        <div class="custom-modal-2">
          <div class="container modal-content">
            <div class="modal-body px-3 text-center">
              <img src="/icons/error.svg" class="mb-3">
              <div class="text-bold fw-bold mb-2">Select an Exam first</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="offcanvas offcanvas-bottom offcanvas-bottom-3" :class="{ 'show': isOffCanvas2Open }" tabindex="-1"
      id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
      <div class="p-2 text-end" @click="isOffCanvas2Open = false">
        <img src="/icons/add.png">
      </div>
      <span class="ms-3 text-700-18">Confirm Transaction Details</span>

      <div class="offcanvas-body mt-2">
        <div class="d-flex justify-content-between align-items-center px-3 pb-3">
          <div class="text-bold b7">Exam:</div>
          <div class="text-bold b7 text-end"><img v-if="provider" :src="`/icons/${provider.toLowerCase()}.svg`"> {{provider}}
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center px-3 pb-3">
          <div class="text-bold b7">Student's Name:</div>
          <div class="text-bold b7 text-end">{{name}}</div>
        </div>
        <div class="d-flex justify-content-between align-items-center px-3 pb-3">
          <div class="text-bold b7">Amount:</div>
          <div class="text-bold b7 text-end">{{amount}}</div>
        </div>
        <div class="px-5">
          <button type="button" class="btn btn-primary text-bold btn-lg w-100 mt-3"
            @click="openPinModal">Continue</button>
        </div>
      </div>
    </div>

    <div class="offcanvas offcanvas-bottom offcanvas-bottom-2" :class="{ 'show': isPinCanvasOpen }" tabindex="-1" id="offcanvasBottom"
      aria-labelledby="offcanvasBottomLabel">
      <div class="p-2 text-end" @click="isPinCanvasOpen = false">
        <img src="/icons/add.png">
      </div>
      <span class="text-center lato-bold mt-3">Enter your Transaction Pin</span>

      <div class="offcanvas-body mt-2">

        <div id="inputs" class="text-center align-item-center my-4">
          <input v-for="(input, index) in inputs" :key="index" class="otp" pattern="\d*" :id="input" autofocus
            autocomplete="off" type="tel" maxlength="1" @input="handleInput(index, $event)" ref="otpInputs"
            :ref="'input_' + index" />
        </div>
      </div>
    </div>

    <Loader v-if="isLoading"></Loader>

    <div v-if="showVerifyModal">
      <div class="custom-modal-overlay">
        <div class="custom-modal-2">
          <div class="container modal-content">
            <div class="modal-body px-3 text-center">
              <img src="/done.png" class="mb-3">
              <div class="text-bold fw-bold mb-2 px-5">Successful.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
input:disabled {
  background-color: transparent !important;
}
</style>