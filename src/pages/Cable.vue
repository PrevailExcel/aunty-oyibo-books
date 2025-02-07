<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Head from "../components/Head.vue";
import { formatMoney } from "../utils";
import axios from 'axios';
import Loader from "../components/Loader.vue";

const route = useRoute();
const router = useRouter();
const plan = ref();
const provider = ref();
const selectedContact = ref(null);
const iuc = ref('');
const network = ref();
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

const openCanvas = () => {
  if (provider.value && provider.value.length > 1)
    isOffCanvasOpen.value = !isOffCanvasOpen.value;
  else
    isWarningOpen.value = !isWarningOpen.value;

};

const selectPackage = (name) => {
  plan.value = name;
  isOffCanvasOpen.value = false;
};


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

    <Head title="Cable TV"></Head>

    <div class="d-flex justify-content-around my-5 px-3 text-center">
      <input type="radio" v-model="provider" value="GoTV" class="btn-check provider" name="options-outlined"
        id="vid-opt" />
      <label for="vid-opt" class="network-bg p-2">
        <div class="bordered gotv rounded-circle">
          <img src="/icons/gotv.svg" />
        </div>
        <div class="text-reg b7 mt-2 text-blue">GoTV</div>
      </label>

      <input type="radio" v-model="provider" value="StarTimes" class="btn-check provider" name="options-outlined"
        id="startimes" />
      <label for="startimes" class="network-bg p-2">
        <div class="bordered rounded-circle">
          <img src="/icons/startimes.svg" />
        </div>
        <div class="text-reg b7 mt-2 text-blue">StarTimes</div>
      </label>

      <input type="radio" v-model="provider" value="DsTV" class="btn-check provider" name="options-outlined"
        id="DsTV" />
      <label for="DsTV" class="network-bg p-2">
        <div class="bordered gotv rounded-circle">
          <img src="/icons/dstv.svg" />
        </div>
        <div class="text-reg b7 mt-2 text-blue">DsTV</div>
      </label>
    </div>

    <div class="row">
      <div class="col-12 mb-2">
        <label class="form-label text-small text-80">Select Package:</label>
        <div class="position-relative login-form">
          <select @mousedown.prevent="openCanvas()" @click="openCanvas()" v-model="plan"
            class="form-control form-control-lg form-select form-select-lg" :class="{ 'filled': type }"
            aria-label="Airtime Type">
            <option selected>{{ plan }}</option>
          </select>
        </div>
      </div>
      <div class="col-12 mb-2">
        <label class="form-label text-small text-80">Decoder Number:</label>
        <div class="position-relative login-form">
          <input type="number" minlength="9" v-model="iuc" required :class="{ 'filled': iuc }"
            class="form-control form-control-lg" />

        </div>
      </div>
    </div>

    <div class="container fixed-bottom mb-5">
      <button type="button" @click="isOffCanvas2Open = !isOffCanvas2Open;
      " class="btn btn-primary btn-lg w-100 mt-5" :disabled="!(iuc >= 11111111)"
        :class="{ 'bg-40': !(iuc >= 11111111) }">Proceed</button>

      <div class="w-100 mb-5"></div>
    </div>


    <div class="backdrop" v-if="isOffCanvas2Open || isPinCanvasOpen"></div>

    <div v-if="isOffCanvasOpen">
      <div name="off-canvas">
        <div class="backdrop" @click="openCanvas()"></div>
      </div>
      <div name="off-canvas" class="off-canvas-container">
        <div class="off-canvas-menu pb-3">
          <div class="p-2 text-end" @click="isOffCanvasOpen = false">
            <img src="/icons/add.png">
          </div>

          <div class="ms-3 mb-3 text-700-18">{{ provider }} Packages</div>
          <!-- Off-canvas menu content goes here -->
          <div v-for="i in [37000, 15700, 5100, 5000, 3000]"
            class="my-card d-flex justify-content-between align-items-center py-4 p-2 mb-2"
            @click="selectPackage(`Premium - ${formatMoney(i, true)}`)">
            <div class="b7 text-reg ms-3">Premium</div>
            <div class="d-flex justify-content-between align-items-stretch me-3">
              <div class="text-reg b7 me-3">{{ formatMoney(i, true) }}</div>
              <div class="text-reg my-check"><img src="/icons/check-blue.svg"> </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isWarningOpen">
      <div class="custom-modal-overlay" @click="isWarningOpen = !isWarningOpen">
        <div class="custom-modal-2">
          <div class="container modal-content">
            <div class="modal-body px-3 text-center">
              <!-- <img src="/done.png" class="mb-3"> -->
              <div class="text-bold fw-bold mb-2">Select a TV provider first</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="offcanvas offcanvas-bottom offcanvas-bottom-1" :class="{ 'show': isOffCanvas2Open }" tabindex="-1"
      id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
      <div class="p-2 text-end" @click="isOffCanvas2Open = false">
        <img src="/icons/add.png">
      </div>
      <span class="ms-3 text-700-18">Confirm Transaction Details</span>

      <div class="offcanvas-body mt-2">
        <div class="d-flex justify-content-between align-items-center px-3 pb-3">
          <div class="text-bold b7">Package:</div>
          <div class="text-bold b7 text-end"><img src="/icons/dstv.svg"> Premium
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center px-3 pb-3">
          <div class="text-bold b7">Amount:</div>
          <div class="text-bold b7 text-end">5000</div>
        </div>
        <div class="d-flex justify-content-between align-items-center px-3 pb-3">
          <div class="text-bold b7">Decoder Number (IUC):</div>
          <div class="text-bold b7 text-end">3316664432</div>
        </div>
        <div class="px-5">
          <button type="button" class="btn btn-primary text-bold btn-lg w-100 mt-3"
            @click="openPinModal">Continue</button>
        </div>
      </div>
    </div>

    <div class="offcanvas offcanvas-bottom offcanvas-bottom-2" :class="{ 'show': isPinCanvasOpen }" tabindex="-1"
      id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
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
