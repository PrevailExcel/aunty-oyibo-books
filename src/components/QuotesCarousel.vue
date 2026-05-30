<template>
  <div class="relative rounded-2xl overflow-hidden px-5 py-5"
       style="background: var(--theme-accent);">
    <!-- Decorative quote mark -->
    <div class="absolute top-3 right-4 font-display text-6xl leading-none opacity-20 text-white select-none">"</div>

    <div class="flex items-start gap-4">
      <!-- Text -->
      <div class="flex-1 min-w-0">
        <transition name="quote-fade" mode="out-in">
          <div :key="currentIndex">
            <p class="font-body text-sm leading-relaxed text-white/95 italic mb-2">
              "{{ quotes[currentIndex].text }}"
            </p>
            <p class="font-sans text-xs font-semibold text-white/70 tracking-wider uppercase">
              — {{ quotes[currentIndex].author }}
            </p>
          </div>
        </transition>
      </div>
    </div>

    <!-- Dots -->
    <div class="flex gap-1.5 mt-4">
      <button
        v-for="(_, i) in quotes"
        :key="i"
        @click="currentIndex = i"
        class="h-1 rounded-full transition-all duration-300"
        :class="i === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { MOCK_QUOTES } from '../api/mockData.js';

const quotes = MOCK_QUOTES;
const currentIndex = ref(0);
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % quotes.length;
  }, 6000);
});
onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
.quote-fade-enter-active,
.quote-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.quote-fade-enter-from { opacity: 0; transform: translateY(8px); }
.quote-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
