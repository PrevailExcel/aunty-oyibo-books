<script setup>
import { ref } from 'vue';
import Splash from './components/Splash.vue';

const showSplash = ref(true);
let online = ref(true);

function init() {
  handleConnectionChange();
  window.addEventListener("online", handleConnectionChange);
  window.addEventListener("offline", handleConnectionChange);

  function handleConnectionChange() {
    const webPing = setInterval(() => {
      if (navigator.onLine)
        online.value = true;
      else
        online.value = false;
      clearInterval(webPing)
    }, 2000);
    return;
  }
};
init()


// Simulate an asynchronous action like loading data or initializing the app
setTimeout(() => {
  showSplash.value = false;
}, 2000); // Adjust the time as needed


</script>

<template>
  <div v-show="!online" class="bg-danger p-2 text-center position-fixed top-0 w-100 fw-bold">You Are Offline</div>
  <div :class="{ 'mt-4': !online }">
    <router-view />
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
