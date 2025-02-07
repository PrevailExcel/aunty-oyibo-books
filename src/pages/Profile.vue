<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Head from '../components/Head.vue'
import Menu from "../components/Menu.vue";
import { formatMoney } from "../utils";
import Auth from "../Auth";

const route = useRoute();
const router = useRouter();

const goBack = () => {
  router.go(-1);
};

let fullNameFromLocalStorage;
const fullName =
  fullNameFromLocalStorage ??
  JSON.parse(localStorage.getItem("regForm"))?.name ??
  JSON.parse(localStorage.getItem("user"))?.firstName + ' ' + JSON.parse(localStorage.getItem("user"))?.lastName;
const email = JSON.parse(Auth.user)?.email;
const image = JSON.parse(Auth.user)?.photo;
const password = "password"
const phone = JSON.parse(Auth.user)?.phone

const selectedFile = ref(null);
const selectedFileURL = ref(null);

const openFileInput = () => {
  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    fileInput.click();
  }
};
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      selectedFileURL.value = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    selectedFileURL.value = null;
  }
  selectedFile.value = file;
};

</script>
<template>

  <div style="background: linear-gradient(269.75deg, #19D0FC -550.59%, var(--blue) 107.92%) !important;
;">
    <div class="container py-3 pb-5">

      <Head title="My Profile" type="dark" logo="true"></Head>
    </div>
    <div class="container rounded-top-30 bg-white position-relative pb-5">
      <div v-if="!selectedFileURL" class="profile-head" :style="{ background: 'url(\'/icons/bg.svg\')' }">
        <div class="position-relative">
          <div @click="openFileInput" class="edit-circle"><img src="/icons/pencil.svg"></div>
        </div>
      </div>
      <div v-else class="profile-head" :style="{ background: `url(${selectedFileURL})` }">
        <div class="position-relative">
          <div @click="openFileInput" class="edit-circle"><img src="/icons/pencil.svg"></div>
        </div>
      </div>

      <input type="file" id="fileInput" accept="image/*" class="form-control" style="display: none"
        @change="handleFileChange" />
      <div class="m-5 pb-2">&nbsp;</div>

      <div class="mt-3 pt-3 pro-name text-center">{{ fullName }}</div>
      <div class="mb-1 pb-3 pro-name-2 text-center">Smart User</div>


      <div class="row mb-3">
        <div class="col-12 mb-2">
          <label class="form-label text-small text-80">Email Address::</label>
          <div class="position-relative login-form">
            <input readonly type="text" minlength="3" v-model="email" required :class="{ 'filled': email }"
              class="form-control form-control-lg" />
          </div>
        </div>
        <div class="col-12 mb-2">
          <label class="form-label text-small text-80">Phone Number:</label>
          <div class="position-relative login-form">
            <input readonly type="text" v-model="phone" class="form-control form-control-lg" />
          </div>
        </div>
        <div class="col-12 mb-2">
          <label class="form-label text-small text-80">Password:</label>
          <div class="position-relative login-form">
            <input readonly type="password" v-model="password" class="form-control form-control-lg" />
          </div>
        </div>
      </div>


      <button type="button" class="btn btn-primary text-bold btn-lg w-100 mb-5" @click="goBack">Save</button>
    </div>

  <Menu></Menu>
  </div>

</template>
