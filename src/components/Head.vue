<script setup>
import Auth from "../Auth";

import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["title", "type", "logo"]);

const logout = () => {
  Auth.logout();
  router.push("/login");
};

const goBack = () => {
  router.go(-1);
};
function arrow() {
  if (props.type == 'dark') return "/icons/back-white.png";
  else return "/icons/back.png";
}
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mt-3" :class="{ 'text-white': props.type == 'dark' }">
    <div class="d-flex">
      <img oncontextmenu="return false;" @click="goBack" :src="arrow()" class="me-3" />
      <div class="text-med">{{ props.title }}</div>
    </div>
    <div v-if="logo" @click="router.push('/settings')">
      <img src="/icons/setting.svg">
    </div>
  </div>
</template>
