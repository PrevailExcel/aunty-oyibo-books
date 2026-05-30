<template>
  <!-- Compact card for grid view -->
  <router-link
    v-if="variant === 'grid'"
    :to="`/series/${book.slug}`"
    class="block press"
  >
    <div class="relative">
      <img
        :src="book.image"
        :alt="book.title"
        class="w-full rounded-xl object-cover book-shadow"
        style="aspect-ratio: 3/4;"
        loading="lazy"
      />
      <!-- Progress indicator -->
      <div v-if="book.progress > 0" class="absolute bottom-0 left-0 right-0 rounded-b-xl overflow-hidden">
        <div class="h-1" style="background: rgba(0,0,0,0.2)">
          <div class="h-full rounded-full" :style="`width: ${book.progress}%; background: var(--theme-accent);`" />
        </div>
      </div>
      <!-- Genre badge -->
      <div v-if="book.genre" class="absolute top-2 left-2">
        <span class="text-[9px] font-sans font-semibold px-1.5 py-0.5 rounded-full text-white"
              style="background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);">
          {{ book.genre }}
        </span>
      </div>
    </div>
    <div class="mt-2 px-0.5">
      <p class="font-sans text-xs font-semibold leading-tight truncate" style="color: var(--theme-text)">{{ book.title }}</p>
      <p class="font-sans text-[10px] mt-0.5 truncate" style="color: var(--theme-muted)">{{ book.author }}</p>
    </div>
  </router-link>

  <!-- Wide card for horizontal scroll -->
  <router-link
    v-else-if="variant === 'wide'"
    :to="`/series/${book.slug}`"
    class="flex-shrink-0 block press"
    style="width: 130px"
  >
    <div class="relative">
      <img
        :src="book.image"
        :alt="book.title"
        class="w-full rounded-xl object-cover book-shadow"
        style="aspect-ratio: 3/4;"
        loading="lazy"
      />
      <div v-if="book.progress > 0" class="absolute bottom-0 left-0 right-0 rounded-b-xl overflow-hidden">
        <div class="h-1" style="background: rgba(0,0,0,0.2)">
          <div class="h-full" :style="`width: ${book.progress}%; background: var(--theme-accent);`" />
        </div>
      </div>
    </div>
    <div class="mt-2 px-0.5">
      <p class="font-sans text-xs font-semibold leading-tight truncate" style="color: var(--theme-text)">{{ book.title }}</p>
      <p class="font-sans text-[10px] mt-0.5 truncate" style="color: var(--theme-muted)">{{ book.author }}</p>
    </div>
  </router-link>

  <!-- List row for library -->
  <router-link
    v-else-if="variant === 'list'"
    :to="`/series/${book.slug}`"
    class="flex items-center gap-3 py-3 press"
    style="border-bottom: 1px solid var(--theme-border)"
  >
    <img
      :src="book.image"
      :alt="book.title"
      class="w-14 h-20 rounded-lg object-cover flex-shrink-0 book-shadow"
    />
    <div class="flex-1 min-w-0">
      <p class="font-sans font-semibold text-sm leading-snug" style="color: var(--theme-text)">{{ book.title }}</p>
      <p class="font-sans text-xs mt-0.5" style="color: var(--theme-muted)">{{ book.author }}</p>
      <p v-if="book.genre" class="font-sans text-[10px] mt-1 font-medium" style="color: var(--theme-muted)">{{ book.genre }} · {{ book.episodes }} episodes</p>
      <div v-if="book.progress > 0" class="mt-2">
        <div class="progress-track">
          <div class="progress-fill" :style="`width: ${book.progress}%`" />
        </div>
        <p class="font-sans text-[10px] mt-1" style="color: var(--theme-muted)">{{ book.progress }}% read</p>
      </div>
    </div>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
         style="color: var(--theme-border); flex-shrink: 0">
      <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </router-link>
</template>

<script setup>
defineProps({
  book: { type: Object, required: true },
  variant: { type: String, default: 'grid' }, // 'grid' | 'wide' | 'list'
});
</script>
