<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Head from '../components/Head.vue'
import { formatMoney } from "../utils";

const route = useRoute();
const router = useRouter();

const goBack = () => {
  router.go(-1);
};

</script>
<template>
    
    <div style="margin: 0; padding: 0; background: linear-gradient(269.75deg, #19D0FC -550.59%, var(--blue) 107.92%) !important;
;">
<div class="container py-3 pb-5">
    <Head title="Transaction" type="dark"></Head>


  </div>

    <div class="container rounded-top-30 bg-white mt-1">

      <div class="text-center pt-2"><img src="/done.png" class="my-4" /></div>
      <div class="text-rem text-center">Successful</div>
      <div class="text-rem-2 text-center my-3">₦500</div>


      <div class="d-flex justify-content-between align-items-center px-3 pb-4 pt-3">
        <div class="text-bold b7 text-80">Service:</div>
        <div class="text-bold b7 text-80 text-end">Airtime</div>
      </div>
      <div class="d-flex justify-content-between align-items-center px-3 pb-4">
        <div class="text-bold b7 text-80">Network:</div>
        <div class="text-bold b7 text-80 text-end mtn"><img src="/mtn.png" width="23" class="rounded-circle"> MTN</div>
      </div>
      <div class="d-flex justify-content-between align-items-center px-3 pb-4">
        <div class="text-bold b7 text-80">Plan Type:</div>
        <div class="text-bold b7 text-80 text-end">VTU</div>
      </div>
      <div class="d-flex justify-content-between align-items-center px-3 pb-4">
        <div class="text-bold b7 text-80">Phone Number:</div>
        <div class="text-bold b7 text-80 text-end">080995454453</div>
      </div>
      <div class="d-flex justify-content-between align-items-center px-3 pb-4">
        <div class="text-bold b7 text-80">Ref ID:</div>
        <div class="text-bold b7 text-80 text-end">55296932FFD43</div>
      </div>
      <div class="d-flex justify-content-between align-items-center px-3 mb-3">
        <div class="text-bold b7 text-80">Date:</div>
        <div class="text-bold b7 text-80 text-end">Monday, 29th April 2024, 3:45pm</div>
      </div>

      
      <button type="button" class="btn btn-primary text-bold btn-lg w-100 mt-5" @click="goBack">Done</button>
    </div>

</div>
</template>
