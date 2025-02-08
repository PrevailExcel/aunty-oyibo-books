<script setup>
import { computed } from "vue";
import QuotesCarousel from '../components/QuotesCarousel.vue';


const items = [1, 2, 3, 4, 55, 5, 5, 5, 5]; // Replace with actual data if necessary'''
const books = [
    { title: "Call Me Legachi", author: "Adesuwa O. Nwokedi", image: "/images/legachi.webp", slug: "call-me-legachi", progress: 80, "favorite": false},
    { title: "Zainab Takes New York", author: "Ayesha Harruana", image: "/images/zain.jpeg", slug: "zainab-takes-new-york", progress: 45, "favorite": false },
    { title: "Gemini", author: "Rejoice K.", image: "/images/series-4.png", slug: "gemini", progress: 30, "favorite": true },
    { title: "Rants of a Nigerian Teen", author: "Rejoice K.", image: "/images/rants.jpg", slug: "rants-of-a-nigerian-teen", progress: 90, "favorite": false },
    { title: "Storm Warning", author: "Rejoice K.", image: "/images/series.png", slug: "storm-warning", progress: 60, "favorite": true },
    { title: "Wild Flower", author: "Rejoice K.", image: "/images/series-1.png", slug: "sands-of-rebellion", progress: 20, "favorite": true },
    { title: "Sands Of Rebellion", author: "Rejoice K.", image: "/images/series-2.png", slug: "storm-warning-2", progress: 10, "favorite": true }
];
const favoriteBooks = computed(() => books.filter(book => book.favorite));
</script>

<template>

    <!-- <Head title="Welcome | Aunty Oyibo Book" /> -->

    <div class="container py-4">
        <!-- Logo -->
        <div class="d-flex align-items-center mb-4 mt-2">
            <img src="/app_icon-2.jpg" alt="Logo" width="24" height="24">
            <h1 class="ms-2 web-name">Aunty Oyibo Stories</h1>
        </div>

        <!-- Greeting -->
        <h2 class="reader mt-2">Hi Reader,</h2>

        <!-- Search -->
        <div class="input-group my-3">
            <input type="text" class="search form-control" placeholder="Search">

            <button class="ms-2 btn btn-dark search-button">
                <img src="/images/search.png">
            </button>
        </div>

        <!-- Quote Section -->
        <QuotesCarousel />

        <!-- Favorite Books -->
        <h4 class="mt-4 mb-3 avail">Readers Top Choice</h4>
        <div class="slider-container">
            <div class="slider">
                <template v-for="book in favoriteBooks" :key="book.slug">
                    <div class="slider-item">

                        <router-link :to="'/series/' + book.slug" class="book-link">
                            <div class="book-card">
                                <img :src="book.image" class="card-img-top rounded-3" :alt="book.title">
                                <div class="card-body">
                                    <div class="book-title mt-2">{{ book.title }}</div>
                                    <div class="book-author mt-1">By {{ book.author }}</div>
                                </div>
                                <div class="progress full-bar mt-2">
                                    <div class="progress-bar progress-bar-animated bg-deep-brown" role="progressbar"
                                        :style="{ width: book.progress + '%' }" :aria-valuenow="book.progress"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </template>
            </div>
        </div>

        <!-- Available Books -->
        <h4 class="mt-5 mb-3 avail">Available Books</h4>
        <div class="row">
            <template v-for="book in books" :key="book.slug">
                <div class="col-md-3 col-4 mb-4">
                    <router-link :to="'/series/' + book.slug" class="book-link">
                        <div class="">
                            <img :src="book.image" class="card-img-top rounded-3" alt="Storm Warning">
                            <div class="card-body">
                                <div class="book-title mt-2">{{ book.title }}</div>
                                <div class="book-author mt-1">{{ book.author }}</div>
                            </div>

                            <div class="progress full-bar mt-2">
                                <div class="progress-bar progress-bar-animated bg-deep-brown" role="progressbar"
                                    :style="{ width: book.progress + '%' }" :aria-valuenow="book.progress"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </template>
        </div>

    </div>
</template>
