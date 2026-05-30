<template>
  <div class="min-h-screen flex flex-col px-6 pt-16 pb-10" style="background: var(--theme-bg)">
    <!-- Logo -->
    <div class="text-center mb-10">
      <div class="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 book-shadow">
        <img src="/app_icon-2.jpg" alt="Logo" class="w-full h-full object-cover" />
      </div>
      <h1 class="font-display text-3xl font-bold" style="color: var(--theme-accent)">Aunty Oyibo</h1>
      <p class="font-body text-base italic mt-1" style="color: var(--theme-muted)">Stories that stay with you</p>
    </div>

    <!-- Form -->
    <div class="max-w-sm mx-auto w-full">
      <h2 class="font-display text-xl font-bold mb-6" style="color: var(--theme-text)">
        {{ isLogin ? 'Welcome back' : 'Create account' }}
      </h2>

      <div v-if="!isLogin" class="mb-4">
        <label class="font-sans text-xs font-semibold uppercase tracking-wider block mb-1.5"
               style="color: var(--theme-muted)">Full Name</label>
        <input v-model="form.name" type="text" placeholder="Your name" class="search-input" />
      </div>

      <div class="mb-4">
        <label class="font-sans text-xs font-semibold uppercase tracking-wider block mb-1.5"
               style="color: var(--theme-muted)">Email</label>
        <input v-model="form.email" type="email" placeholder="you@example.com" class="search-input" />
      </div>

      <div class="mb-6">
        <label class="font-sans text-xs font-semibold uppercase tracking-wider block mb-1.5"
               style="color: var(--theme-muted)">Password</label>
        <input v-model="form.password" type="password" placeholder="••••••••" class="search-input" />
      </div>

      <div v-if="error" class="mb-4 px-4 py-3 rounded-xl font-sans text-sm"
           style="background: rgba(192,57,43,0.1); color: #c0392b; border: 1px solid rgba(192,57,43,0.2)">
        {{ error }}
      </div>

      <button
        @click="submit"
        :disabled="loading"
        class="w-full py-4 rounded-2xl font-sans font-semibold text-base text-white press transition-all"
        style="background: var(--theme-accent);"
      >
        <span v-if="!loading">{{ isLogin ? 'Sign In' : 'Create Account' }}</span>
        <span v-else>...</span>
      </button>

      <button
        @click="isLogin = !isLogin"
        class="w-full mt-4 py-3 font-sans text-sm press"
        style="color: var(--theme-muted)"
      >
        {{ isLogin ? "Don't have an account? " : 'Already have an account? ' }}
        <span class="font-semibold" style="color: var(--theme-accent)">{{ isLogin ? 'Sign Up' : 'Sign In' }}</span>
      </button>

      <!-- Continue as guest -->
      <button
        @click="$router.push('/')"
        class="w-full mt-2 py-3 font-sans text-sm press"
        style="color: var(--theme-border)"
      >
        Continue as guest →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLogin = ref(true);
const loading = ref(false);
const error = ref('');

const form = reactive({ name: '', email: '', password: '' });

const submit = async () => {
  error.value = '';
  loading.value = true;
  try {
    // TODO: connect to useAuth().login(form.email, form.password)
    await new Promise(r => setTimeout(r, 800)); // mock delay
    router.push('/');
  } catch (e) {
    error.value = e.response?.data?.message || 'Something went wrong. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>
