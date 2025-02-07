<!-- Splash.vue -->
<template>
    <div class="splash">
      <div class="logo"><img src="/logo.png"></div>
    </div>
  </template>
  
  <script setup>
      document.querySelector('meta[name="theme-color"]').setAttribute('content', "#07163F");  
  </script>
  
  <style scoped>
  .splash {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(269.75deg, #19D0FC -550.59%, #07163F 107.92%);
    color: #ffffff;
  }
  
  .logo {
    font-size: 24px;
  }
  </style>
  