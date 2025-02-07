<script setup>
import { ref } from "vue";
import axios from "axios";
import Auth from "../Auth";
import Loader from '../components/Loader.vue';
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const emailCorrect = ref();
const isLoading = ref(false);
const showVerifyModal = ref(false);

const loginUser = async () => {

    isLoading.value = true;
    try {
        const response = await axios.post('/auth/login', {  //
            username: "atuny0", //account.value,
            password: "9uQFF1Lh" //password.value
        });

        if (response.status === 200) {
            isLoading.value = false;
            
        showVerifyModal.value = true
            // router.push('/setpin');
        } else {
            console.error('Error:', response.statusText);

            isLoading.value = false;
        }
    } catch (error) {
        isLoading.value = false;
        console.error('Error:', error);
    }
}
function openGmail(){
    
      window.location.href = "googlegmail://"; 

      setTimeout(() => {
        window.location.href = "https://mail.google.com"; 
      }, 1000); 
    
}

</script>

<template>
    <div class="container bg-white">
        <div class="py-5 text-center"><img src="/logo-dark.png" width="114" /></div>

        <span class="lato-bold">Reset Password</span>
        <div class="text-reg pt-1">Please enter your email address to get a verification link.</div>
        <form class="row g-3 mt-3" @submit.prevent="loginUser">
            <div class="d-grid">
                <div class="mt-1 row">
                    <div class="col-12 mb-3">
                        <label class="form-label text-small">Email Address"</label>
                        <div class="position-relative login-form">
                            <input type="email" v-model="email" class="form-control form-control-lg"
                                :class="{ 'filled': email }">
                            <div class="mini mt-1 text-danger" v-if="email">
                                This email address doesn’t exist
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    <div class="mt-5">
                        <button type="submit" class="btn btn-primary btn-lg w-100 mt-5" :disabled="!email"
                            :class="{ 'bg-40': !email }">Next</button>
                    </div>
                </div>
            </div>
        </form>



        <Loader v-if="isLoading"></Loader>

        <div v-if="showVerifyModal">
            <div class="custom-modal-overlay">
                <div class="custom-modal">
                    <div class="container modal-content">
                        <div class="modal-body">
                            <div class="text-reg bold fw-bold mb-2">Verify your email</div>
                            <p class="text-small text-80">A verification link has been sent to your email</p>

                            <div class="text-center">
                                <button @click="openGmail()" type="button"
                                    class="text-center py-2 btn btn-primary px-5 text-small mt-2">Verify</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
