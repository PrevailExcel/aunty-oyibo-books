<template>
  <div class="pb-nav">
    <!-- Header -->
    <div class="px-5 pt-safe pt-5 pb-2">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl overflow-hidden flex-shrink-0"
               style="background: var(--theme-accent)">
            <img src="/app_icon-2.jpg" alt="Logo" class="w-full h-full object-cover" />
          </div>
          <div>
            <h1 class="font-display text-sm font-bold leading-none" style="color: var(--theme-accent)">Aunty Oyibo</h1>
            <p class="font-sans text-[10px] mt-0.5" style="color: var(--theme-muted)">Stories</p>
          </div>
        </div>
        <!-- Notifications -->
        <button class="w-9 h-9 rounded-full flex items-center justify-center press"
                style="background: var(--theme-surface)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round" style="color: var(--theme-text)">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
        </button>
      </div>

      <!-- Greeting -->
      <h2 class="font-display text-2xl font-bold leading-tight" style="color: var(--theme-text)">
        Good {{ greeting }}, Reader.
      </h2>
      <p class="font-sans text-sm mt-1" style="color: var(--theme-muted)">What story calls you today?</p>
    </div>

    <!-- Search -->
    <div class="px-5 mt-4">
      <div class="relative">
        <svg class="absolute left-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="color: var(--theme-muted)">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          v-model="searchQuery"
          @input="onSearch"
          type="text"
          placeholder="Search stories..."
          class="search-input pl-10"
        />
      </div>
    </div>

    <!-- Search results -->
    <div v-if="searchQuery.length > 1" class="px-5 mt-3">
      <div v-if="searchResults.length">
        <BookCard v-for="book in searchResults" :key="book.slug" :book="book" variant="list" />
      </div>
      <p v-else class="font-sans text-sm text-center py-6" style="color: var(--theme-muted)">No stories found for "{{ searchQuery }}"</p>
    </div>

    <template v-if="!searchQuery">
      <!-- Quote card -->
      <div class="px-5 mt-5">
        <QuotesCarousel />
      </div>

      <!-- Continue Reading (if any in progress) -->
      <div v-if="inProgress.length" class="mt-7">
        <div class="flex items-center justify-between px-5 mb-3">
          <h3 class="font-display text-lg font-bold" style="color: var(--theme-text)">Continue Reading</h3>
          <router-link to="/library" class="font-sans text-xs font-semibold" style="color: var(--theme-accent)">
            See all
          </router-link>
        </div>
        <div class="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-1">
          <BookCard v-for="book in inProgress" :key="book.slug" :book="book" variant="wide" />
        </div>
      </div>

      <!-- Featured / Top Picks -->
      <div class="mt-7">
        <div class="flex items-center justify-between px-5 mb-3">
          <h3 class="font-display text-lg font-bold" style="color: var(--theme-text)">Readers' Top Picks</h3>
        </div>
        <div class="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-1">
          <BookCard v-for="book in featured" :key="book.slug" :book="book" variant="wide" />
        </div>
      </div>

      <!-- All Books Grid -->
      <div class="mt-7 px-5">
        <h3 class="font-display text-lg font-bold mb-3" style="color: var(--theme-text)">All Stories</h3>
        <div class="grid grid-cols-3 gap-3">
          <BookCard v-for="book in books" :key="book.slug" :book="book" variant="grid" />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import QuotesCarousel from '../components/QuotesCarousel.vue';
import BookCard from '../components/BookCard.vue';
import { MOCK_BOOKS } from '../api/mockData.js';

const books = ref(MOCK_BOOKS);
const searchQuery = ref('');
const searchResults = ref([]);

const greeting = computed(() => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
});

const featured = computed(() => books.value.filter(b => b.inLibrary).slice(0, 5));
const inProgress = computed(() => books.value.filter(b => b.progress > 0 && b.progress < 100));

const onSearch = () => {
  const q = searchQuery.value.trim().toLowerCase();
  if (q.length < 2) { searchResults.value = []; return; }
  searchResults.value = books.value.filter(
    b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
  );
};

// TODO: Replace with API call
// onMounted(async () => {
//   const { data } = await booksApi.list();
//   books.value = data.books;
// });
</script>
