<template>
  <div class="pb-nav">
    <div class="px-5 pt-safe pt-6">
      <h1 class="font-display text-2xl font-bold" style="color: var(--theme-text)">Explore</h1>
      <p class="font-sans text-sm mt-1" style="color: var(--theme-muted)">Discover your next great read</p>
    </div>

    <!-- Genre chips -->
    <div class="flex gap-2 overflow-x-auto no-scrollbar px-5 mt-5 pb-1">
      <button
        v-for="genre in genres"
        :key="genre"
        @click="activeGenre = genre"
        class="flex-shrink-0 px-4 py-2 rounded-full font-sans text-sm font-semibold press transition-all"
        :style="activeGenre === genre
          ? 'background: var(--theme-accent); color: white;'
          : 'background: var(--theme-surface); color: var(--theme-muted); border: 1px solid var(--theme-border);'"
      >
        {{ genre }}
      </button>
    </div>

    <!-- Grid -->
    <div class="px-5 mt-5 grid grid-cols-3 gap-3">
      <BookCard
        v-for="book in filteredBooks"
        :key="book.slug"
        :book="book"
        variant="grid"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import BookCard from '../components/BookCard.vue';
import { MOCK_BOOKS } from '../api/mockData.js';

const books = ref(MOCK_BOOKS);
const activeGenre = ref('All');
const genres = computed(() => {
  const g = [...new Set(books.value.map(b => b.genre).filter(Boolean))];
  return ['All', ...g];
});

const filteredBooks = computed(() =>
  activeGenre.value === 'All'
    ? books.value
    : books.value.filter(b => b.genre === activeGenre.value)
);
</script>
