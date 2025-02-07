<script setup>
import Head from './Head.vue';
import Nav from './Nav.vue';
import Auth from '../Auth';


const url = location.host + '/' + Auth.user.user.username;

const data = {
    title: "Send Anonymous messages here, I won't know who sent it. ",
    text: url,
    url: url,
};
const share = () => {

    if (navigator.canShare(data)) {
        navigator.share(data)
            .then(function () {
                return;
            })
            .catch(function (e) {
                alert('error in ' + e)
            });
    }

}
</script>
<template>
    <Head :type="'Profile'" />
    <div class="container">
        <div class="row position-relative">
            <div class="text-center">
                <img src="/avatar.jpg" height="135" width="135" class="rounded-circle img-fluid">

                <div class="mt-2">
                    <div class="d-flex justify-content-between">
                        <div class="ps-2">
                            <h4 class="fw-bold text-one">12</h4>
                            <small class="">Messages</small>
                        </div>
                        <div class="">
                            <h4 class="fw-bold text-one">5</h4>
                            <small class="">My Groups</small>
                        </div>
                        <div class="pe-2" @click="share">
                            <h4 class="fw-bold text-one"><i class="fa fa-share-alt"></i></h4>
                            <small class="">Share Link</small>
                        </div>
                    </div>
                </div>
                <div class="bg-one rounded-top mt-3 mx-3 text-start">
                    <div class="row px-4">
                        <div class="col-12 fw-bold px-2 py-3">
                            {{ Auth.user.user.username }}
                        </div>
                        <div class="col-12 fw-bold px-2 pb-3 d-flex justify-content-between">
                            <router-link to="/profile" class="text-white text-decoration-none">Add Email</router-link>
                            <i class="fa fa-envelope"></i>
                        </div>
                        <div class="col-12 fw-bold px-2 pb-3 d-flex justify-content-between">
                            <router-link to="/profile" class="text-white text-decoration-none">Create Group</router-link>
                            <i class="fa fa-users"></i>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row mt-2 px-4">
                <h4 class="pt-4">Share Link</h4>
                <div class="container">
                    <div class="row">
                        <div class="col-12 mb-4">
                            <div class="d-flex justify-content-between">
                                <a href="#" class="fa s p-3 fa-whatsapp"></a>
                                <a href="#" class="fa s p-3 fa-facebook"></a>
                                <a href="#" class="fa s p-3 fa-twitter"></a>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex justify-content-between">
                                <a href="#" class="fa s p-3 fa-linkedin"></a>
                                <a href="#" class="fa s p-3 fa-youtube"></a>
                                <a href="#" class="fa s p-3 fa-instagram"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Nav />
</template>

<style>
.fa.s {
    font-size: 30px;
    text-align: center;
    text-decoration: none;
    border-radius: 10%;
}

.fa:hover {
    opacity: 0.7;
}

.fa-facebook {
    background: #3B5998;
    color: white;
}

.fa-twitter {
    background: #55ACEE;
    color: white;
}

.fa-whatsapp {
    background: #075e54;
    color: white;
}

.fa-linkedin {
    background: #007bb5;
    color: white;
}

.fa-youtube {
    background: #bb0000;
    color: white;
}

.fa-instagram {
    background: #125688;
    color: white;
}

.fa-pinterest {
    background: #cb2027;
    color: white;
}

.fa-snapchat-ghost {
    background: #fffc00;
    color: white;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.fa-skype {
    background: #00aff0;
    color: white;
}

.fa-android {
    background: #a4c639;
    color: white;
}

.fa-dribbble {
    background: #ea4c89;
    color: white;
}
</style>