<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Head from '../components/Head.vue'
import { formatMoney } from "../utils";

const route = useRoute();
const router = useRouter();
const empty = ref(true)

const openCanvas = () => {
  isOffCanvasOpen.value = !isOffCanvasOpen.value;
};


</script>
<template>
  <div class="container bg-white py-3">

    <Head title="Transactions"></Head>

    <div v-if="!empty" class="mt-4">
      <div v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]">
        <div class="my-card d-flex justify-content-between align-items-center p-3 mb-2">
          <div class="d-flex justify-content-between align-items-stretch ps-1">
            <div>
              <div class="text-bold b7">Airtime Top-Up</div>
              <div class="text-small py-2">₦500</div>
              <div class="text-small">Today, 3:45pm</div>
              <div class="text-small text-success pt-2">Success</div>
            </div>
          </div>
          <div class="b7 text-reg me-3"><button @click="router.push('/transaction')"
              class="bg-blue btn rounded text-white text-small">view</button></div>
        </div>
        <div class="my-card d-flex justify-content-between align-items-center p-3 mb-2">
          <div class="d-flex justify-content-between align-items-stretch ps-1">
            <div>
              <div class="text-bold b7">Airtime Top-Up</div>
              <div class="text-small py-2">₦200</div>
              <div class="text-small">Yesterday, 2:45pm</div>
              <div class="text-small text-success pt-2">Success</div>
            </div>
          </div>
          <div class="b7 text-reg me-3"><button @click="router.push('/transaction')"
              class="bg-blue btn rounded text-white text-small">view</button></div>
        </div>
        <div class="my-card d-flex justify-content-between align-items-center p-3 mb-2">
          <div class="d-flex justify-content-between align-items-stretch ps-1">
            <div>
              <div class="text-bold b7">Data Top-Up</div>
              <div class="text-small py-2">₦150</div>
              <div class="text-small">Tuesday, 23rd March 2024, 2:45pm.</div>
              <div class="text-small text-danger pt-2">Failed</div>
            </div>
          </div>
          <div class="b7 text-reg me-3"><button @click="router.push('/transaction')"
              class="bg-blue btn rounded text-white text-small">view</button></div>
        </div>
        <div class="my-card d-flex justify-content-between align-items-center p-3 mb-2">
          <div class="d-flex justify-content-between align-items-stretch ps-1">
            <div>
              <div class="text-bold b7">Airtime Top-Up</div>
              <div class="text-small py-2">₦620</div>
              <div class="text-small">Tuesday, 23rd March 2024, 2:45pm.</div>
              <div class="text-small text-success pt-2">Success</div>
            </div>
          </div>
          <div class="b7 text-reg me-3"><button @click="router.push('/transaction')"
              class="bg-blue btn rounded text-white text-small">view</button></div>
        </div>
        <div class="my-card d-flex justify-content-between align-items-center p-3 mb-2">
          <div class="d-flex justify-content-between align-items-stretch ps-1">
            <div>
              <div class="text-bold b7">Credit</div>
              <div class="text-small py-2">₦8000</div>
              <div class="text-small">Tuesday, 23rd March 2024, 2:45pm.</div>
              <div class="text-small text-success pt-2">Success</div>
            </div>
          </div>
          <div class="b7 text-reg me-3"><button @click="router.push('/transaction')"
              class="bg-blue btn rounded text-white text-small">view</button></div>
        </div>
      </div>
    </div>
    <div class="text-center center-image" v-else>
      <img src="/notran.png" class="img-fluid px-3">

      <div class="no-history">No Transaction History</div>
    </div>

  </div>
</template>
