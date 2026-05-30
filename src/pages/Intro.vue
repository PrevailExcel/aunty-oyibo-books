<template>
  <div v-if="book" class="min-h-screen pb-nav">
    <!-- Hero with blurred background -->
    <div class="relative h-[52vh] overflow-hidden">
      <!-- Blurred BG -->
      <div class="absolute inset-0"
           :style="`background-image: url(${book.image}); background-size: cover; background-position: center; filter: blur(22px); transform: scale(1.15); opacity: 0.6;`">
      </div>
      <!-- Gradient overlay -->
      <div class="absolute inset-0" style="background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, transparent 100%);" />
      <div class="absolute inset-x-0 bottom-0 h-32"
           :style="`background: linear-gradient(to bottom, transparent, var(--theme-bg));`" />

      <!-- Back button -->
      <button
        @click="$router.go(-1)"
        class="absolute top-safe top-5 left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center press"
        style="background: rgba(0,0,0,0.4); backdrop-filter: blur(8px);"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
      </button>

      <!-- Book cover centered -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12 z-10">
        <img
          :src="book.image"
          :alt="book.title"
          class="w-28 rounded-2xl book-shadow"
          style="aspect-ratio: 3/4; object-fit: cover;"
        />
      </div>
    </div>

    <!-- Content -->
    <div class="px-5 pt-16 text-center">
      <!-- Genre pill -->
      <span v-if="book.genre"
            class="inline-block text-xs font-sans font-semibold px-3 py-1 rounded-full mb-3"
            style="background: var(--theme-surface); color: var(--theme-accent); border: 1px solid var(--theme-border)">
        {{ book.genre }}
      </span>

      <h1 class="font-display text-2xl font-bold leading-tight" style="color: var(--theme-text)">
        {{ book.title }}
      </h1>
      <p class="font-sans text-sm mt-1.5" style="color: var(--theme-muted)">
        by {{ book.author }}
      </p>

      <!-- Stats row -->
      <div class="flex items-center justify-center gap-5 mt-4">
        <div class="text-center">
          <p class="font-display font-bold text-lg" style="color: var(--theme-text)">{{ book.episodes }}</p>
          <p class="font-sans text-[10px] uppercase tracking-wider" style="color: var(--theme-muted)">Episodes</p>
        </div>
        <div class="w-px h-8" style="background: var(--theme-border)" />
        <div class="text-center">
          <p class="font-display font-bold text-lg" style="color: var(--theme-text)">4.8</p>
          <p class="font-sans text-[10px] uppercase tracking-wider" style="color: var(--theme-muted)">Rating</p>
        </div>
        <div class="w-px h-8" style="background: var(--theme-border)" />
        <div class="text-center">
          <p class="font-display font-bold text-lg" style="color: var(--theme-text)">2.4k</p>
          <p class="font-sans text-[10px] uppercase tracking-wider" style="color: var(--theme-muted)">Readers</p>
        </div>
      </div>

      <!-- Progress if any -->
      <div v-if="book.progress > 0" class="mt-4 mx-auto max-w-xs">
        <div class="progress-track">
          <div class="progress-fill" :style="`width: ${book.progress}%`" />
        </div>
        <p class="font-sans text-xs mt-1.5 text-center" style="color: var(--theme-muted)">
          {{ book.progress }}% read
        </p>
      </div>

      <!-- Description -->
      <div class="mt-5 text-left">
        <h2 class="font-display font-bold text-base mb-2" style="color: var(--theme-text)">About this story</h2>
        <p class="font-body text-base leading-relaxed" style="color: var(--theme-secondary); line-height: 1.7">
          {{ book.description }}
        </p>
      </div>

      <!-- Divider -->
      <div class="mt-5 mb-4 h-px" style="background: var(--theme-border)" />

      <!-- Episode list preview -->
      <div class="text-left">
        <h2 class="font-display font-bold text-base mb-3" style="color: var(--theme-text)">Episodes</h2>
        <div>
          <button
            v-for="ep in episodeList"
            :key="ep.number"
            @click="goToEpisode(ep.number)"
            class="w-full flex items-center justify-between py-3 press"
            style="border-bottom: 1px solid var(--theme-border)"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-sans font-bold"
                   :style="ep.number === 1 ? 'background: var(--theme-accent); color: white;' : 'background: var(--theme-surface); color: var(--theme-muted);'">
                {{ ep.number }}
              </div>
              <div class="text-left">
                <p class="font-sans text-sm font-semibold" style="color: var(--theme-text)">{{ ep.title }}</p>
                <p class="font-sans text-[11px] mt-0.5" style="color: var(--theme-muted)">~8 min read</p>
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 style="color: var(--theme-border); flex-shrink: 0">
              <path d="M9 18l6-6-6-6" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Spacer -->
      <div class="h-6" />
    </div>

    <!-- Sticky CTA -->
    <div class="fixed bottom-0 left-0 right-0 px-5 pb-safe z-40"
         style="background: var(--theme-bg); border-top: 1px solid var(--theme-border); padding-top: 12px; padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));">
      <router-link :to="`/series/${book.slug}/episode/1`" class="block">
        <button class="w-full py-4 rounded-2xl font-sans font-semibold text-base press transition-all"
                style="background: var(--theme-accent); color: white; box-shadow: 0 4px 20px rgba(125,78,28,0.3)">
          {{ book.progress > 0 ? `Continue · Ep ${Math.ceil(book.progress / (100 / book.episodes))}` : 'Start Reading' }}
        </button>
      </router-link>
    </div>
  </div>

  <div v-else class="flex items-center justify-center min-h-screen">
    <p class="font-sans" style="color: var(--theme-muted)">Story not found.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MOCK_BOOKS } from '../api/mockData.js';

const route = useRoute();
const router = useRouter();
const books = ref(MOCK_BOOKS);
const book = computed(() => books.value.find(b => b.slug === route.params.slug));

// Fake episode list
const episodeList = computed(() =>
  Array.from({ length: book.value?.episodes || 0 }, (_, i) => ({
    number: i + 1,
    title: i === 0 ? 'The Beginning'
         : i === 1 ? 'First Light'
         : i === 2 ? 'What They Don\'t Say'
         : `Episode ${i + 1}`,
  }))
);

const goToEpisode = (num) => {
  router.push(`/series/${route.params.slug}/episode/${num}`);
};
</script>
