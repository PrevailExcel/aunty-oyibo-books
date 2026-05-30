<template>
  <div class="grain">
    <!-- Offline banner -->
    <transition name="fade">
      <div v-if="!online"
           class="fixed top-0 left-0 right-0 z-[100] py-2 text-center font-sans text-xs font-semibold text-white"
           style="background: #c0392b;">
        You're offline
      </div>
    </transition>

    <!-- Main router view -->
    <div :class="{ 'mt-8': !online }">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>

    <!-- Bottom navigation (only on main pages) -->
    <transition name="fade">
      <BottomNav v-if="showNav" />
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import BottomNav from './components/BottomNav.vue';
import { useTheme } from './composables/useTheme.js';

// Init theme
useTheme();

const route = useRoute();
const online = ref(navigator.onLine);
const showNav = computed(() => route.meta?.showNav !== false);

const handleOnline = () => { online.value = true; };
const handleOffline = () => { online.value = false; };

onMounted(() => {
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
});
onUnmounted(() => {
  window.removeEventListener('online', handleOnline);
  window.removeEventListener('offline', handleOffline);
});
</script>
