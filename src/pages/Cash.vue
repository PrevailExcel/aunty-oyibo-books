<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Head from "../components/Head.vue";
import { formatMoney } from "../utils";
import Loader from "../components/Loader.vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const bank = ref(null);
const selectedContact = ref(null);
const amount = ref(null);
const network = ref(null);
const account = ref();
const isWarningOpen = ref(false);
const isWarning2Open = ref(false);
const isOffCanvasOpen = ref(false);
const isOffCanvas2Open = ref(false);
const isPinCanvasOpen = ref(false);
const isLoading = ref(false);
const showVerifyModal = ref(false)
const inputs = ["input1", "input2", "input3", "input4"];
const otpValues = ref(Array(inputs.length).fill(""));
const focusedIndex = ref(0);
const toGet = ref(null);
const formattedNumber = ref(null)

const highlightNetwork = () => {
  if (selectedContact.value.length > 10)
    network.value = 'airtel';
}

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

const openCanvas = () => {
  isOffCanvas2Open.value = !isOffCanvas2Open.value;

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

watch(selectedContact, () => {
  if (selectedContact.value.length > 10)
    network.value = 'airtel';
  else
    network.value = null;
});

watch(formattedNumber, () => {
  if (formattedNumber.value && formattedNumber.value.length > 1) {
    const numericInput = formattedNumber.value.replace(/\D/g, '');
    const formatted = numericInput.replace(/(\d{4})/g, '$1-');
    formattedNumber.value = formatted.replace(/-$/, '');
  }
})

watch(amount, () => {
  toGet.value = (0.9 * amount.value)

})

const selectBank = (name) => {
  bank.value = name;
  isOffCanvas2Open.value = false;
  account.value = null;
};


const checkNetwork = () => {
  if (!(network.value && network.value.length > 1)) {
    formattedNumber.value = null;
    isWarning2Open.value = !isWarning2Open.value;
  }
};
</script>
<template>
  <div class="container bg-white py-3">

    <Head title="Airtime2Cash"></Head>

    <div class="d-flex justify-content-between my-5 px-3 text-center">
      <div class="mtn p-2" @click="network = 'mtn'" :class="{ 'mtn-bg rounded rounded-3': network == 'mtn' }">
        <img src="/mtn.png" width="50" class="rounded-circle" />
        <div class="text-reg b7 mt-2">MTN</div>
      </div>
      <div class="airtel p-2" @click="network = 'airtel'"
        :class="{ 'airtel-bg rounded rounded-3': network == 'airtel' }">
        <img src="/airtel.png" width="50" class="rounded-circle" />
        <div class="text-reg b7 mt-2">AIRTEL</div>
      </div>
      <div class="etisalat p-2" @click="network = 'etisalat'"
        :class="{ 'etisalat-bg rounded rounded-3': network == 'etisalat' }">
        <img src="/etisalat.png" width="50" class="rounded-circle" />
        <div class="text-reg b7 mt-2">9MOBILE</div>
      </div>
      <div class="glo p-2" @click="network = 'glo'" :class="{ 'glo-bg rounded rounded-3': network == 'glo' }">
        <img src="/glo.png" width="50" class="rounded-circle" />
        <div class="text-reg b7 mt-2">GLO</div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 mb-2">
        <label class="form-label text-small text-80">Card Number (max length is 16):</label>
        <div class="position-relative login-form">
          <input type="tel" maxlength="19" @focus.prevent="checkNetwork()" v-model="formattedNumber"
            :class="{ 'filled': formattedNumber }" required class="form-control form-control-lg" />
        </div>
      </div>
      <div class="col-12 mb-2">
        <label class="form-label text-small text-80">Amount:</label>
        <div class="position-relative login-form">
          <input type="number" min="50" minlength="2" v-model="amount" required :class="{ 'filled': amount }"
            class="form-control form-control-lg" />
        </div>

        <div v-if="toGet" class="ex-info mt-3">This airtime will be purchased at {{ formatMoney(toGet, true) }}</div>

        <div class="ran-blue-text mt-4">If you want it to be funded to your bank, please fill the details below. If not,
          skip and click
          on proceed. </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12 mb-2">
        <label class="form-label text-small text-80">Bank Name:</label>
        <div class="position-relative login-form">
          <select @mousedown.prevent="openCanvas()" @click="openCanvas()" v-model="bank"
            class="form-control form-control-lg form-select form-select-lg" :class="{ 'filled': bank }"
            aria-label="Bank Name">
            <option selected>{{ bank }}</option>
          </select>
        </div>
      </div>
      <div class="col-12 mb-2">
        <label class="form-label text-small text-80">Account Number:</label>
        <div class="position-relative login-form">
          <input type="tel" minlength="10" v-model="account" required :class="{ 'filled': account }"
            class="form-control form-control-lg" />
        </div>
      </div>
    </div>

    <div class="col-12 mb-5">
      <button type="button" @click="isOffCanvasOpen = !isOffCanvasOpen;
      " class="btn btn-primary btn-lg w-100 mt-5" :disabled="(!formattedNumber && !amount || amount <= 49)"
        :class="{ 'bg-40': (!formattedNumber && !amount || amount <= 49) }">Proceed</button>

      <div class="w-100 mb-5"></div>
    </div>


    <div class="backdrop" v-if="isOffCanvasOpen || isOffCanvas2Open || isPinCanvasOpen"></div>
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

    <!-- <div class="backdrop" v-if="isOffCanvas2Open || isPinCanvasOpen"></div> -->

    <div v-if="isOffCanvas2Open">
      <div name="off-canvas">
        <div class="backdrop" @click="openCanvas()"></div>
      </div>
      <div name="off-canvas" class="off-canvas-container">
        <div class="off-canvas-menu pb-3">
          <div class="p-2 text-end" @click="isOffCanvas2Open = false">
            <img src="/icons/add.png">
          </div>

          <div class="ms-3 mb-3 text-700-18">Available Banks</div>
          <!-- Off-canvas menu content goes here -->
          <div
            v-for="i in ['Access Bank', 'First Bank', 'UBA', 'GT Bank', 'Fidelity Bank', 'Zenith Bank', 'Opay', 'Moniepoint Microfinance Bank', 'Ecobank', 'Union Bank', 'Keystone Bank']"
            class="my-card d-flex justify-content-between align-items-center py-4 p-2 mb-2" @click="selectBank(i)">
            <div class="b7 text-reg ms-3">{{ i }}</div>
          </div>
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
              <div class="text-bold fw-bold mb-2 px-5">Your request has been processed
                successfully.</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isWarning2Open">
      <div class="custom-modal-overlay" @click="isWarning2Open = !isWarning2Open">
        <div class="custom-modal-2">
          <div class="container modal-content">
            <div class="modal-body px-3 text-center">
              <!-- <img src="/done.png" class="mb-3"> -->
              <div class="text-bold fw-bold mb-2">Select a network first</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
