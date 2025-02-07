<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Head from "../components/Head.vue";
import axios from "axios";
import { formatMoney } from "../utils";
import Loader from "../components/Loader.vue";

const route = useRoute();
const router = useRouter();
const type = ref('');
const plan = ref(null);
const network = ref();
const selectedContact = ref(null);
const isOffCanvasOpen = ref(false);
const isPinCanvasOpen = ref(false);
const isLoading = ref(false);
const showVerifyModal = ref(false)
const inputs = ["input1", "input2", "input3", "input4"];
const otpValues = ref(Array(inputs.length).fill(""));
const focusedIndex = ref(0);
const plans = [
  { plan: 0.5, amount: 150 },
  { plan: 1.0, amount: 250 },
  { plan: 2.0, amount: 520 },
  { plan: 3.0, amount: 770 },
  { plan: 5.0, amount: 1270 },
  { plan: 10, amount: 2750 },
]
const highlightNetwork = () => {
  if (selectedContact.value.length > 10)
    network.value = 'mtn';
}

watch(selectedContact, () => {
  if (selectedContact.value.length > 10)
    network.value = 'mtn';
  else
    network.value = null;
});

const openPinModal = () => {
  isOffCanvasOpen.value = false;
  isPinCanvasOpen.value = true;
}

const openContactPicker = () => {
  if ('contacts' in navigator) {

    // Extract contact details
    const props = ['tel', 'name'];
    const opts = { multiple: false };

    navigator.contacts.select(props, opts).then(contact => {
      if (contact) {
        console.log(contact)
        console.log(contact[0].tel)
        selectedContact.value = contact[0].tel;
        highlightNetwork()
      } else {
        // User canceled contact selection
        selectedContact.value = null;
      }
    }).catch(error => {
      console.log(error)
    });
  } else {
    console.log('The contacts API is not supported.');
  }
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

const setType = (thetype) => {
  type.value = thetype;
}
const selectPlan = (theplan) => {
  plan.value = theplan.plan
}
</script>
<template>
  <div class="container bg-white py-3">

    <Head title="Data Bundle"></Head>

    <div class="d-flex justify-content-between my-5 px-3 text-center">
      <div class="mtn p-2" :class="{ 'mtn-bg rounded rounded-3': network == 'mtn' }">
        <img src="/mtn.png" width="50" class="rounded-circle" />
        <div class="text-reg b7 mt-2">MTN</div>
      </div>
      <div class="airtel p-2" :class="{ 'airtel-bg rounded rounded-3': network == 'airtel' }">
        <img src="/airtel.png" width="50" class="rounded-circle" />
        <div class="text-reg b7 mt-2">AIRTEL</div>
      </div>
      <div class="etisalat p-2" :class="{ 'etisalat-bg rounded rounded-3': network == 'etisalat' }">
        <img src="/etisalat.png" width="50" class="rounded-circle" />
        <div class="text-reg b7 mt-2">9MOBILE</div>
      </div>
      <div class="glo p-2" :class="{ 'glo-bg rounded rounded-3': network == 'glo' }">
        <img src="/glo.png" width="50" class="rounded-circle" />
        <div class="text-reg b7 mt-2">GLO</div>
      </div>
    </div>

    <div class="mt-4 mb-3 text-reg">Recent Numbers</div>
    <div class="d-flex over-x mb-3">
      <div @click="selectedContact = '09054246419'" class="recent px-3 me-2 d-flex justify-content-center align-items-center">
        <img src="/mtn.png" class="rounded-circle me-2" width="24" />
        <div class="text-small">08054276844</div>
      </div>
      <div @click="selectedContact = '08054276844'" class="recent px-3 me-2 d-flex justify-content-center align-items-center">
        <img src="/mtn.png" class="rounded-circle me-2" width="24" />
        <div class="text-small">09054246419</div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 mb-2">
        <label class="form-label text-small text-80">Phone Number:</label>
        <div class="position-relative login-form">
          <input type="tel" maxlength="20" @keyup="highlightNetwork" v-model="selectedContact"
            :class="{ 'filled': selectedContact }" required class="form-control form-control-lg" />
          <span class="position-absolute" @click="openContactPicker">
            <img class="" src="/icons/call-add.png" />
          </span>
        </div>
      </div>
    </div>
    <div class="text-center mt-2">
      <button class="bn btn-border px-4 text-reg me-4" :class="{ active: type == 'sme' }" @click="setType('sme')">
        SME
      </button>
      <button class="bn btn-border px-3 text-reg ms-2" :class="{ active: type == 'corp' }" @click="setType('corp')">
        COOPERATE GIFTING
      </button>
    </div>

    <div class="row mt-5" v-if="type">
      <div class="col-12 mb-3" v-for="i in plans">
        <label @click="selectPlan(i)" :class="{ active: plan == i.plan }"
          class="bn btn-border w-100 px-3 text-reg d-flex justify-content-between align-items-center">
          <span>{{ i.plan }}GB</span><span>{{ formatMoney(i.amount) }}</span>
        </label>
      </div>
    </div>
    <div class="col-12" v-if="type">
      <button type="button" :disabled="!plan || !selectedContact" :class="{ 'bg-40': !plan || !selectedContact }"
        class="btn btn-primary text-bold btn-lg w-100 mt-5"  @click="isOffCanvasOpen = !isOffCanvasOpen;">
        Proceed
      </button>
    </div>


    <!-- Confirmation Modal  -->
    <div class="backdrop" v-if="isOffCanvasOpen || isPinCanvasOpen"></div>
    <div class="offcanvas offcanvas-bottom offcanvas-bottom-1" :class="{ 'show': isOffCanvasOpen }" tabindex="-1"
      id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
      <div class="p-2 text-end" @click="isOffCanvasOpen = false">
        <img src="/icons/add.png">
      </div>
      <span class="ms-3 lato-bold">Confirm Transaction Details</span>

      <div class="offcanvas-body mt-2">
        <div class="d-flex justify-content-between align-items-center px-3 pb-3">
          <div class="text-bold b7">Network:</div>
          <div class="text-bold b7 text-end airtel"><img src="/airtel.png" width="23" class="rounded-circle"> Airtel
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center px-3 pb-3">
          <div class="text-bold b7">Airtime Type:</div>
          <div class="text-bold b7 text-end">VTU</div>
        </div>
        <div class="d-flex justify-content-between align-items-center px-3 pb-3">
          <div class="text-bold b7">Amount:</div>
          <div class="text-bold b7 text-end">500</div>
        </div>
        <div class="d-flex justify-content-between align-items-center px-3 pb-3">
          <div class="text-bold b7">Phone Number:</div>
          <div class="text-bold b7 text-end">08012323434</div>
        </div>
        <div class="px-5">
          <button type="button" class="btn btn-primary text-bold btn-lg w-100 mt-3"
            @click="openPinModal">Continue</button>
        </div>
      </div>
    </div>


    <!-- Enter Pin -->
    <div class="offcanvas offcanvas-bottom offcanvas-bottom-2" :class="{ 'show': isPinCanvasOpen }" tabindex="-1"
      id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
      <div class="p-2 text-end" @click="isPinCanvasOpen = false">
        <img src="/icons/add.png">
      </div>
      <span class="text-center lato-bold mt-2">Enter your Transaction Pin</span>

      <div class="offcanvas-body mt-2">
        <div id="inputs" class="text-center align-item-center my-3">
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
