<script setup>
import { ref, onMounted } from 'vue';

let online = ref(true);
const theme = ref(localStorage.getItem("theme") || "light-mode");

onMounted(() => {
    document.body.classList.remove("light-mode", "dark-mode", "paper-mode");
    document.body.classList.add(theme.value);


    // Define theme colors (use a color close to the paper background)
    const themeColors = {
        "light-mode": "#ffffff",  // White for light mode
        "dark-mode": "#14120f",   // Black for dark mode
        "paper-mode": "#deb887"   // Light brown for paper mode
    };

    // Update <meta name="theme-color">
    let metaTag = document.querySelector("meta[name='theme-color']");
    if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("name", "theme-color");
        document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", themeColors[newTheme]);
});

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
