<template>
  <div class="min-h-screen">
    <!-- Top AppBar (auto-hides on scroll) -->
    <transition name="bar-slide">
      <div v-show="showBar"
           class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
           style="height: 54px; background: var(--theme-bg); border-bottom: 1px solid var(--theme-border);">
        <button @click="$router.go(-1)" class="w-9 h-9 flex items-center justify-center press rounded-full">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" style="color: var(--theme-text)">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <p class="font-display font-bold text-sm truncate max-w-[180px]" style="color: var(--theme-text)">
          {{ book?.title || 'Reading...' }}
        </p>
        <div class="flex items-center gap-2">
          <button @click="showThemePanel = true"
                  class="w-9 h-9 flex items-center justify-center press rounded-full">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" style="color: var(--theme-text)">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </button>
          <button @click="showChapters = true"
                  class="w-9 h-9 flex items-center justify-center press rounded-full">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" style="color: var(--theme-text)">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </transition>

    <!-- Reader Content -->
    <div
      ref="contentEl"
      @scroll="onScroll"
      @click="toggleBar"
      class="overflow-y-auto"
      style="height: 100vh; padding-top: 54px;"
    >
      <div class="max-w-xl mx-auto px-6 py-6 pb-nav">
        <!-- Episode header -->
        <p class="font-sans text-xs font-semibold uppercase tracking-widest mb-1"
           style="color: var(--theme-muted)">Episode {{ episodeNumber }}</p>
        <h2 class="font-display text-xl font-bold mb-6" style="color: var(--theme-text)">{{ episode?.title || 'Loading...' }}</h2>

        <!-- Reading progress bar -->
        <div class="fixed top-0 left-0 right-0 h-0.5 z-50" style="background: var(--theme-border)">
          <div class="h-full transition-all duration-200"
               :style="`width: ${readPercent}%; background: var(--theme-accent);`" />
        </div>

        <!-- Story text -->
        <article
          class="reading-content allow-select"
          v-html="episode?.content"
        />

        <!-- Episode nav -->
        <div class="flex gap-3 mt-12">
          <button
            v-if="episodeNumber > 1"
            @click="goEpisode(episodeNumber - 1)"
            class="flex-1 py-3.5 rounded-xl font-sans font-semibold text-sm press"
            style="background: var(--theme-surface); color: var(--theme-text); border: 1px solid var(--theme-border)">
            ← Previous
          </button>
          <button
            @click="goEpisode(episodeNumber + 1)"
            class="flex-1 py-3.5 rounded-xl font-sans font-semibold text-sm press text-white"
            style="background: var(--theme-accent)">
            Next Episode →
          </button>
        </div>
      </div>
    </div>

    <!-- Theme Panel (bottom sheet) -->
    <transition name="sheet">
      <div v-if="showThemePanel" class="fixed inset-0 z-50" @click.self="showThemePanel = false">
        <div class="absolute bottom-0 left-0 right-0 rounded-t-3xl px-6 pt-5 pb-8"
             style="background: var(--theme-bg); border-top: 1px solid var(--theme-border);">
          <div class="w-10 h-1 rounded-full mx-auto mb-5" style="background: var(--theme-border)" />
          <h3 class="font-display font-bold text-base mb-4" style="color: var(--theme-text)">Reading Theme</h3>

          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="t in themes"
              :key="t.id"
              @click="setTheme(t.id)"
              class="flex flex-col items-center gap-2 py-4 rounded-2xl press border-2 transition-all"
              :style="t.id === currentTheme
                ? `background: ${t.bg}; border-color: var(--theme-accent);`
                : `background: ${t.bg}; border-color: transparent;`"
            >
              <div class="w-6 h-6 rounded-full" :style="`background: ${t.text};`" />
              <span class="font-sans text-xs font-semibold" :style="`color: ${t.text};`">{{ t.label }}</span>
            </button>
          </div>

          <!-- Font size -->
          <div class="mt-5">
            <h4 class="font-sans text-sm font-semibold mb-3" style="color: var(--theme-muted)">Text Size</h4>
            <div class="flex items-center gap-4">
              <button @click="fontSize = Math.max(14, fontSize - 1)"
                      class="w-10 h-10 rounded-xl flex items-center justify-center press font-display text-xl font-bold"
                      style="background: var(--theme-surface); color: var(--theme-text)">A</button>
              <div class="flex-1 h-1 rounded-full" style="background: var(--theme-border)">
                <div class="h-full rounded-full" :style="`width: ${((fontSize - 14) / 10) * 100}%; background: var(--theme-accent);`" />
              </div>
              <button @click="fontSize = Math.min(24, fontSize + 1)"
                      class="w-10 h-10 rounded-xl flex items-center justify-center press font-display text-2xl font-bold"
                      style="background: var(--theme-surface); color: var(--theme-text)">A</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Chapters Drawer -->
    <transition name="drawer">
      <div v-if="showChapters" class="fixed inset-0 z-50 flex" @click.self="showChapters = false">
        <div class="w-72 h-full overflow-y-auto chapters-panel shadow-2xl"
             style="border-right: 1px solid var(--theme-border);">
          <div class="p-5">
            <div class="flex items-center gap-3 mb-5">
              <img v-if="book" :src="book.image" class="w-10 h-14 rounded-lg object-cover flex-shrink-0" />
              <div>
                <p class="font-display font-bold text-sm leading-snug" style="color: var(--theme-text)">{{ book?.title }}</p>
                <p class="font-sans text-xs mt-0.5" style="color: var(--theme-muted)">{{ book?.author }}</p>
              </div>
            </div>
            <div class="h-px mb-4" style="background: var(--theme-border)" />
            <h4 class="font-sans text-xs font-semibold uppercase tracking-widest mb-3" style="color: var(--theme-muted)">Episodes</h4>
            <button
              v-for="ep in episodeList"
              :key="ep.number"
              @click="goEpisode(ep.number); showChapters = false"
              class="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl mb-1 press"
              :style="ep.number === episodeNumber
                ? 'background: var(--theme-surface);'
                : ''"
            >
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-sans font-bold flex-shrink-0"
                    :style="ep.number === episodeNumber
                      ? 'background: var(--theme-accent); color: white;'
                      : 'background: var(--theme-border); color: var(--theme-muted);'">
                {{ ep.number }}
              </span>
              <span class="font-sans text-sm" style="color: var(--theme-text)">{{ ep.title }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTheme } from '../composables/useTheme.js';
import { MOCK_BOOKS, MOCK_EPISODE } from '../api/mockData.js';

const route = useRoute();
const router = useRouter();
const { current: currentTheme, setTheme } = useTheme();

const books = ref(MOCK_BOOKS);
const book = computed(() => books.value.find(b => b.slug === route.params.slug));
const episodeNumber = computed(() => parseInt(route.params.episode) || 1);

// Mock episode data
const episode = ref({ ...MOCK_EPISODE, number: episodeNumber.value });
watch(episodeNumber, (n) => {
  episode.value = { ...MOCK_EPISODE, number: n, title: `Episode ${n}` };
});

const episodeList = computed(() =>
  Array.from({ length: book.value?.episodes || 8 }, (_, i) => ({
    number: i + 1,
    title: i === 0 ? 'The Beginning' : i === 1 ? 'First Light' : `Episode ${i + 1}`,
  }))
);

// UI state
const showBar = ref(true);
const showThemePanel = ref(false);
const showChapters = ref(false);
const contentEl = ref(null);
const readPercent = ref(0);
const fontSize = ref(18);
let lastY = 0;

const onScroll = (e) => {
  const el = e.target;
  const scrolled = el.scrollTop;
  const total = el.scrollHeight - el.clientHeight;
  readPercent.value = total > 0 ? Math.round((scrolled / total) * 100) : 0;

  // Hide bar on scroll down, show on scroll up
  showBar.value = scrolled < lastY || scrolled < 50;
  lastY = scrolled;
};

const toggleBar = () => { showBar.value = !showBar.value; };

const goEpisode = (num) => {
  router.push(`/series/${route.params.slug}/episode/${num}`);
  if (contentEl.value) contentEl.value.scrollTop = 0;
};

// Apply dynamic font size
watch(fontSize, (size) => {
  document.querySelectorAll('.reading-content').forEach(el => {
    el.style.fontSize = `${size}px`;
  });
});

const themes = [
  { id: 'light', label: 'Light', bg: '#fdf6ec', text: '#1e1008' },
  { id: 'dark', label: 'Dark', bg: '#0e0a06', text: '#f2e9d8' },
  { id: 'paper', label: 'Paper', bg: '#f5e6c8', text: '#1e1008' },
];
</script>

<style scoped>
.bar-slide-enter-active, .bar-slide-leave-active { transition: transform 0.25s ease; }
.bar-slide-enter-from, .bar-slide-leave-to { transform: translateY(-100%); }

.sheet-enter-active, .sheet-leave-active { transition: opacity 0.25s ease; }
.sheet-enter-active > div:last-child, .sheet-leave-active > div:last-child { transition: transform 0.3s ease; }
.sheet-enter-from > div:last-child, .sheet-leave-to > div:last-child { transform: translateY(100%); }
.sheet-enter-from, .sheet-leave-to { opacity: 0; }

.drawer-enter-active, .drawer-leave-active { transition: opacity 0.2s ease; }
.drawer-enter-active > div:first-child, .drawer-leave-active > div:first-child { transition: transform 0.3s ease; }
.drawer-enter-from > div:first-child, .drawer-leave-to > div:first-child { transform: translateX(-100%); }
.drawer-enter-from, .drawer-leave-to { opacity: 0; }
</style>
