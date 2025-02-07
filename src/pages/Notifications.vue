<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Head from '../components/Head.vue'
import { formatMoney } from "../utils";

const route = useRoute();
const router = useRouter();
const empty = ref(false)

</script>
<template>
  <div class="container bg-white py-3">

    <Head title="Notifications"></Head>

    <div v-if="!empty" class="mt-4">
      <div v-for="i in [1, 2, 3, 4, 5, 6, 7, 8]" class="">
        <div class="row my-card d-flex align-items-center p-3 mb-2 notii">
          Your recharge was successful! Enjoy uninterrupted services
          with DIgixcel.
        </div>
        <div class="row my-card d-flex align-items-center p-3 mb-2 notii">
          Stay updated with the latest offers. Check out our new data
          bundles.
        </div>
        <div class="row my-card d-flex align-items-center p-3 mb-2 notii">
          Running low on data? Recharge now and stay connected with
          Digixcel.
        </div>
        <div class="row my-card d-flex align-items-center p-3 mb-2 notii">
          Reminder: Pay your bills hassle-free with Digixcel. Never miss
          a due date again.
        </div>
      </div>
    </div>



    <div class="text-center center-image" v-else>
      <img src="/notran.png" class="img-fluid px-3">
    </div>

  </div>
</template>
