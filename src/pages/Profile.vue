<template>
  <div class="pb-nav">
    <div class="px-5 pt-safe pt-6">
      <h1 class="font-display text-2xl font-bold" style="color: var(--theme-text)">Profile</h1>
    </div>

    <!-- User card -->
    <div class="mx-5 mt-5 rounded-2xl p-5 flex items-center gap-4"
         style="background: var(--theme-surface); border: 1px solid var(--theme-border)">
      <div class="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 font-display text-2xl font-bold text-white"
           style="background: var(--theme-accent)">
        R
      </div>
      <div class="flex-1">
        <p class="font-display font-bold text-base" style="color: var(--theme-text)">Reader</p>
        <p class="font-sans text-sm" style="color: var(--theme-muted)">reader@example.com</p>
        <p class="font-sans text-xs mt-1.5" style="color: var(--theme-muted)">
          <span class="font-semibold" style="color: var(--theme-accent)">{{ stats.read }}</span> read ·
          <span class="font-semibold" style="color: var(--theme-accent)">{{ stats.saved }}</span> saved
        </p>
      </div>
      <button class="w-9 h-9 rounded-full flex items-center justify-center press"
              style="background: var(--theme-border)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" style="color: var(--theme-text)">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      </button>
    </div>

    <!-- Reading theme -->
    <div class="mx-5 mt-5">
      <h3 class="font-sans text-xs font-semibold uppercase tracking-widest mb-3" style="color: var(--theme-muted)">
        Reading Theme
      </h3>
      <div class="grid grid-cols-3 gap-3">
        <button
          v-for="t in themes"
          :key="t.id"
          @click="setTheme(t.id)"
          class="flex flex-col items-center gap-2 py-4 rounded-2xl press border-2 transition-all"
          :style="currentTheme === t.id
            ? `background: ${t.bg}; border-color: var(--theme-accent);`
            : `background: ${t.bg}; border-color: transparent; opacity: 0.7;`"
        >
          <div class="w-5 h-5 rounded-full" :style="`background: ${t.text};`" />
          <span class="font-sans text-xs font-semibold" :style="`color: ${t.text};`">{{ t.label }}</span>
        </button>
      </div>
    </div>

    <!-- Settings list -->
    <div class="mx-5 mt-6">
      <h3 class="font-sans text-xs font-semibold uppercase tracking-widest mb-3" style="color: var(--theme-muted)">
        Settings
      </h3>
      <div class="rounded-2xl overflow-hidden" style="border: 1px solid var(--theme-border)">
        <button
          v-for="(item, i) in settingsItems"
          :key="item.label"
          class="w-full flex items-center gap-3 px-4 py-3.5 press"
          :style="`background: var(--theme-surface); ${i < settingsItems.length - 1 ? 'border-bottom: 1px solid var(--theme-border);' : ''}`"
        >
          <span class="text-lg">{{ item.icon }}</span>
          <span class="flex-1 font-sans text-sm font-medium text-left" style="color: var(--theme-text)">{{ item.label }}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
               style="color: var(--theme-border)">
            <path d="M9 18l6-6-6-6" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Sign out -->
    <div class="mx-5 mt-4 mb-6">
      <button
        class="w-full py-3.5 rounded-xl font-sans font-semibold text-sm press"
        style="background: var(--theme-surface); color: #c0392b; border: 1px solid rgba(192,57,43,0.2)"
        @click="handleSignOut"
      >
        Sign Out
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTheme } from '../composables/useTheme.js';
import { MOCK_BOOKS } from '../api/mockData.js';

const { current: currentTheme, setTheme } = useTheme();

const books = MOCK_BOOKS;
const stats = computed(() => ({
  read: books.filter(b => b.progress === 100).length,
  saved: books.filter(b => b.inLibrary).length,
}));

const themes = [
  { id: 'light', label: 'Light', bg: '#fdf6ec', text: '#1e1008' },
  { id: 'dark', label: 'Dark', bg: '#0e0a06', text: '#f2e9d8' },
  { id: 'paper', label: 'Paper', bg: '#f5e6c8', text: '#1e1008' },
];

const settingsItems = [
  { icon: '🔔', label: 'Notifications' },
  { icon: '🔒', label: 'Privacy & Security' },
  { icon: '📱', label: 'Download for Offline' },
  { icon: '💬', label: 'Help & Support' },
  { icon: 'ℹ️', label: 'About Aunty Oyibo' },
];

const handleSignOut = () => {
  // TODO: call useAuth().logout()
  console.log('sign out');
};
</script>
