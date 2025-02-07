<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Head from '../components/Head.vue'
import { formatMoney } from "../utils";
import Menu from "../components/Menu.vue";

const route = useRoute();
const router = useRouter();
const empty = ref(false)
const amount = ref(15000);
const showAmount = ref(false);
const isOffCanvasOpen = ref(false);

const toggleAmount = () => {
  showAmount.value = !showAmount.value;
};

function fund(bank, number) {
  router.push({ path: '/fund/' + bank + '/' + number })
}

const openCanvas = () => {
  isOffCanvasOpen.value = !isOffCanvasOpen.value;
};

</script>
<template>
  <div class="container bg-white py-3">

    <Head title="My Wallet"></Head>


    <div class="my-4">
      <div class="banner px-4 pt-4 pb-3">
        <div class="d-flex justify-content-between">
          <div>
            <div class="text-small mb-3">My Wallet Balance:</div>

            <div class="title mt-2 text-white" @click="toggleAmount">
              <span v-if="!showAmount">--- ------</span><span v-else>{{ formatMoney(amount) }}</span>
            </div>
          </div>

          <div class="text-small text-center mb-3">
            <div>Charges</div>

            <div class="mt-4">0</div>
          </div>
        </div>

        <div class="d-flex align-items-center mt-4">
          <button class="btn btn-default btn-banner text-blue me-2" @click="openCanvas">
            <img src="/icons/wallet.png" class="me-1" type="button" />
            Fund Account
          </button>
        </div>
      </div>
    </div>

    <div class="mt-5 mb-3 d-flex justify-content-between align-items-center">
      <div class="text-bold">Recent Transactions</div>
      <div @click="router.push('deposits')" class="seeall">See all</div>
    </div>

    <div v-if="!empty" class="mt-2">
      <div v-for="i in [1, 2]">
        <div class="my-card d-flex justify-content-between align-items-center p-3 mb-2">
          <div class="d-flex justify-content-between align-items-stretch ps-1">
            <div>
              <div class="text-bold b7">Account Credited</div>
              <div class="text-small py-2">₦2,000</div>
              <div class="text-small">Yesterday, 2:45pm</div>
              <div class="text-small text-success pt-2">Success</div>
            </div>
          </div>
          <div class="b7 text-reg me-3"><button @click="router.push('/transaction')"
              class="bg-blue btn rounded text-white text-small">view</button></div>
        </div>
      </div>
    </div>
    <div class="center-image center-image-2" v-else>
      <img src="/notran.png" class="img-fluid px-3">
      <div class="no-history">No Deposit History yet</div>
    </div>


    <div v-if="isOffCanvasOpen">
      <div name="off-canvas">
        <div class="off-canvas-backdrop" @click="openCanvas()"></div>
      </div>
      <div name="off-canvas" class="off-canvas-container">
        <div class="off-canvas-menu py-2">
          <!-- Off-canvas menu content goes here -->
          <div class="my-card d-flex justify-content-between align-items-center p-2 mb-2"
            @click="fund('International Bank PLC', '09234567854')">
            <div class="d-flex justify-content-between align-items-stretch">
              <div class="rounded me-2 p-4 bg-info"></div>
              <div>
                <div class="text-reg b7 mt-1">International Bank PLC</div>
                <div class="text-reg text-80 mt-2">09234567854</div>
              </div>
            </div>
            <div class="b7 text-reg me-3"><img src="/icons/copy.png"></div>
          </div>
          <div class="my-card d-flex justify-content-between align-items-center p-2 mb-2"
            @click="fund('Diamond Bank', '09234567854')">
            <div class="d-flex justify-content-between align-items-stretch">
              <div class="rounded me-2 p-4 bg-info"></div>
              <div>
                <div class="text-reg b7 mt-1">Diamond Bank</div>
                <div class="text-reg text-80 mt-2">09234567854</div>
              </div>
            </div>
            <div class="b7 text-reg me-3"><img src="/icons/copy.png"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Menu></Menu>
</template>
