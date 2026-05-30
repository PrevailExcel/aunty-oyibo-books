<template>
  <nav class="bottom-nav fixed bottom-0 left-0 right-0 z-50 flex items-end justify-around"
       style="background: var(--theme-bg); border-top: 1px solid var(--theme-border);">
    <button
      v-for="item in items"
      :key="item.name"
      @click="navigate(item)"
      class="flex flex-col items-center gap-1 px-5 pt-3 pb-2 press transition-all"
      :class="isActive(item) ? 'opacity-100' : 'opacity-40'"
    >
      <component :is="item.icon" :active="isActive(item)" />
      <span class="text-[10px] font-sans font-semibold tracking-wide" style="color: var(--theme-text)">
        {{ item.label }}
      </span>
    </button>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { h } from 'vue';

const router = useRouter();
const route = useRoute();

// Inline SVG icon components
const HomeIcon = ({ active }) => h('svg', {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', 'stroke-width': active ? 2.2 : 1.8,
  'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  style: 'color: var(--theme-text)'
}, [
  h('path', { d: 'M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1z' }),
  h('path', { d: 'M9 21V12h6v9' }),
]);

const LibraryIcon = ({ active }) => h('svg', {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', 'stroke-width': active ? 2.2 : 1.8,
  'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  style: 'color: var(--theme-text)'
}, [
  h('path', { d: 'M4 19.5A2.5 2.5 0 016.5 17H20' }),
  h('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z' }),
]);

const ExploreIcon = ({ active }) => h('svg', {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', 'stroke-width': active ? 2.2 : 1.8,
  'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  style: 'color: var(--theme-text)'
}, [
  h('circle', { cx: 11, cy: 11, r: 8 }),
  h('line', { x1: 21, y1: 21, x2: 16.65, y2: 16.65 }),
]);

const ProfileIcon = ({ active }) => h('svg', {
  width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', 'stroke-width': active ? 2.2 : 1.8,
  'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  style: 'color: var(--theme-text)'
}, [
  h('path', { d: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' }),
  h('circle', { cx: 12, cy: 7, r: 4 }),
]);

const items = [
  { name: 'home', label: 'Home', icon: HomeIcon, path: '/' },
  { name: 'explore', label: 'Explore', icon: ExploreIcon, path: '/explore' },
  { name: 'library', label: 'Library', icon: LibraryIcon, path: '/library' },
  { name: 'profile', label: 'Profile', icon: ProfileIcon, path: '/profile' },
];

const isActive = (item) => {
  if (item.path === '/') return route.path === '/';
  return route.path.startsWith(item.path);
};

const navigate = (item) => {
  router.push(item.path);
};
</script>
