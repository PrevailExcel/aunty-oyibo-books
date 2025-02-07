<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Head from '../components/Head.vue'
import { showNotification } from "../notification";
import { formatMoney } from "../utils";
import Auth from "../Auth";

const route = useRoute();
const router = useRouter();
const empty = ref(false)
const user = JSON.parse(Auth.user)

const notificationEnabled = ref(false);

const toggleNotification = () => {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
    notificationEnabled.value = false;
  } else if (Notification.permission === "granted") {
    notificationEnabled.value = true;
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        notificationEnabled.value = false;
      } else {
        notificationEnabled.value = false;
      }
    });
  }
}
toggleNotification()

const copyText = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      showNotification("Congratulations! You have a new signup.", "500 naira has been added to your wallet as referral bonus.");
    })
    .catch((error) => {
      console.error('Failed to copy text: ', error);
    });
};

function logout() {
  Auth.logout();
  router.push('/login');
}

</script>
<template>
  <div class="container bg-white py-3">

    <Head title="Settings"></Head>

    <!-- Account -->
    <div class="d-flex mt-5">
      <div>
        <img class="me-2" src="/icons/profile-setting.svg">
      </div>

      <div class="row gx-4 mt-2 five-14">
        <div class="text-bold">Account</div>

        <div class="mt-4 d-flex justify-content-between align-items-center">
          <div>Edit Profile</div>
          <div>
            <img src="/icons/arrow-left.svg">
          </div>
        </div>
        <div class="mt-4 d-flex justify-content-between align-items-center">
          <div>Change Transaction Pin</div>
          <div>
            <img src="/icons/arrow-left.svg">
          </div>
        </div>
        <div class="mt-4 d-flex justify-content-between align-items-center">
          <div>Change Password</div>
          <div>
            <img src="/icons/arrow-left.svg">
          </div>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <div class="d-flex mt-5">
      <div>
        <img class="me-2" src="/icons/notifications.svg">
      </div>

      <div class="row gx-4 mt-2 five-14">
        <div class="text-bold">Notifications</div>

        <div class="mt-4 d-flex justify-content-between align-items-center">
          <div>App Notifications</div>
          <div class="float-end">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="notificationEnabled" @change="toggleNotification">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- More -->
    <div class="d-flex mt-5">
      <div>
        <img class="me-2" width="40" height="40" src="/icons/more.svg">
      </div>

      <div class="row gx-4 mt-2 five-14">
        <div class="text-bold">More</div>

        <div class="mt-4 d-flex justify-content-between align-items-center">
          <div>
            <div>Referral Link</div>
            <small class="mini text-blue">https://www.digixcel.ng/{{user.ref_code}}</small>
          </div>
          <div>
            <img @click="copyText('https://www.digixcel.ng/{{user.ref_code}}')" src="/icons/copy.svg" class="me-1">
          </div>
        </div>
        <div class="mt-4 d-flex justify-content-between align-items-center">
          <div>Contact Us</div>
        </div>
        <div class="mt-4 d-flex justify-content-between align-items-center">
          <div>About Us</div>
        </div>
        <div class="mt-4 d-flex justify-content-between align-items-center">
          <div class="d-flex justify-content-between align-items-center"><img src="/icons/whatsapp.svg" class="me-2">
            Join Our Whatsapp Group</div>
        </div>
      </div>
    </div>

    <!-- Logout -->
    <div class="d-flex mt-5" @click="logout()">
      <div>
        <img class="me-2" width="40" height="40" src="/icons/logout.svg">
      </div>

      <div class="row gx-4 mt-2 five-14">
        <div class="text-bold">Logout</div>
      </div>
      
    </div>

  </div>
</template>
