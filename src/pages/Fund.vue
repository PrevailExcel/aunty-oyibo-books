<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import Head from '../components/Head.vue'

const route = useRoute();

</script>
<template>
  <div class="container bg-white py-3">
    <Head title="Fund Account"></Head>
    <div class="my-4">
      <div class="banner px-3 pt-3 pb-3">
        <div class="d-flex justify-content-between">
          <div>
            <div class="text-small mb-1">Account Number:</div>
            <div class="title-2 mt-2 text-white">
              092-3456-7854
            </div>
            <div class="text-small mt-3 mb-1">Account Name:</div>
            <div class="title-2 my-2 text-white">
              RACHEAL KENE-DIGIXCEL
            </div>
          </div>

          <div class="text-small text-center mb-3">
            <div class="mt-3 me-1"><img src="/icons/copy-white.png" /></div>
          </div>
        </div>        
      </div>

      <div class="ms-4 mt-3 text-bold b7"><b>{{route.params.bank}}</b></div>

      <div class="mt-5">
        <div class="text-reg-2 mb-3">
          HOW TO TRANSFER MONEY TO THE ACCOUNT
        </div>

        <ol>
        <li class="text-reg mb-3">Login to your preferred bank app.</li>
        <li class="text-reg mb-3">Go to the required page for transferring money.</li>
        <li class="text-reg mb-3">Select <span class="text-blue">“{{route.params.bank}}”</span>  as the recipient bank.</li>
        <li class="text-reg mb-3">Enter your Digixcel account number or copy and paste from
      above.</li>
        <li class="text-reg mb-3">Confirm transaction details and enter your pin to complete
      the payment.</li>
        </ol>
      </div>
    </div>

  </div>
</template>
