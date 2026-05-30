<template>
  <div class="pb-nav">
    <div class="px-5 pt-safe pt-6">
      <h1 class="font-display text-2xl font-bold" style="color: var(--theme-text)">My Library</h1>
      <p class="font-sans text-sm mt-1" style="color: var(--theme-muted)">Your reading journey</p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-0 mt-5 px-5">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="activeTab = tab"
        class="flex-1 py-2.5 font-sans text-sm font-semibold transition-all press"
        :style="activeTab === tab
          ? 'border-bottom: 2.5px solid var(--theme-accent); color: var(--theme-accent);'
          : 'border-bottom: 2.5px solid var(--theme-border); color: var(--theme-muted);'"
      >
        {{ tab }}
      </button>
    </div>

    <div class="px-5 mt-4">
      <!-- In Progress -->
      <div v-if="activeTab === 'Reading'">
        <div v-if="reading.length">
          <BookCard v-for="book in reading" :key="book.slug" :book="book" variant="list" />
        </div>
        <div v-else class="text-center py-16">
          <div class="text-5xl mb-4">📖</div>
          <p class="font-display font-bold text-lg" style="color: var(--theme-text)">Nothing in progress yet</p>
          <p class="font-sans text-sm mt-2" style="color: var(--theme-muted)">Start a story from the home page</p>
          <router-link to="/" class="inline-block mt-4 px-6 py-3 rounded-xl font-sans font-semibold text-sm text-white press"
                       style="background: var(--theme-accent)">
            Explore Stories
          </router-link>
        </div>
      </div>

      <!-- Saved -->
      <div v-if="activeTab === 'Saved'">
        <div v-if="saved.length">
          <BookCard v-for="book in saved" :key="book.slug" :book="book" variant="list" />
        </div>
        <div v-else class="text-center py-16">
          <div class="text-5xl mb-4">🔖</div>
          <p class="font-display font-bold text-lg" style="color: var(--theme-text)">No saved books yet</p>
          <p class="font-sans text-sm mt-2" style="color: var(--theme-muted)">Bookmark stories you want to read later</p>
        </div>
      </div>

      <!-- Finished -->
      <div v-if="activeTab === 'Finished'">
        <div v-if="finished.length">
          <BookCard v-for="book in finished" :key="book.slug" :book="book" variant="list" />
        </div>
        <div v-else class="text-center py-16">
          <div class="text-5xl mb-4">✨</div>
          <p class="font-display font-bold text-lg" style="color: var(--theme-text)">No finished books yet</p>
          <p class="font-sans text-sm mt-2" style="color: var(--theme-muted)">Complete a story to see it here</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import BookCard from '../components/BookCard.vue';
import { MOCK_BOOKS } from '../api/mockData.js';

const books = ref(MOCK_BOOKS);
const tabs = ['Reading', 'Saved', 'Finished'];
const activeTab = ref('Reading');

const reading = computed(() => books.value.filter(b => b.progress > 0 && b.progress < 100));
const saved = computed(() => books.value.filter(b => b.inLibrary));
const finished = computed(() => books.value.filter(b => b.progress === 100));
</script>
