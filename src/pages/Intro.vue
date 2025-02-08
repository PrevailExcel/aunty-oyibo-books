<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import QuotesCarousel from '../components/QuotesCarousel.vue';

// Sample books data
const books = ref([
    { title: "Call Me Legachi", author: "Adesuwa O. Nwokedi", image: "/images/legachi.webp", slug: "call-me-legachi", progress: 80, favorite: false },
    { title: "Zainab Takes New York", author: "Ayesha Harruana", image: "/images/zain.jpeg", slug: "zainab-takes-new-york", progress: 45, favorite: false },
    { title: "Gemini", author: "Rejoice K.", image: "/images/series-4.png", slug: "gemini", progress: 30, favorite: true },
    { title: "Rants of a Nigerian Teen", author: "Rejoice K.", image: "/images/rants.jpg", slug: "rants-of-a-nigerian-teen", progress: 90, favorite: false },
    { title: "Storm Warning", author: "Rejoice K.", image: "/images/series.png", slug: "storm-warning", progress: 60, favorite: true },
    { title: "Wild Flower", author: "Rejoice K.", image: "/images/series-1.png", slug: "wild-flower", progress: 20, favorite: true },
    { title: "Sands Of Rebellion", author: "Rejoice K.", image: "/images/series-2.png", slug: "sands-of-rebellion", progress: 10, favorite: true }
]);

// Get the current route
const route = useRoute();

// Find the book using the slug from the URL
const book = computed(() => books.value.find(b => b.slug === route.params.slug));

// Default book cover in case no book is found
const bookCover = computed(() => book.value ? book.value.image : "/images/default-book-cover.png");

</script>

<template>
    <div v-if="book" class="d-flex flex-column m-0">
        <!-- Background with Blur and Dark Overlay -->
        <div class="book-cover-background position-relative" :style="{ backgroundImage: `url(${bookCover})` }">
            <div class="overlay"></div>
            <div class="app-bar">
                <button class="btn text-white fs-4" @click="$router.go(-1)">
                    <img src="/icons/back.png" width="24">
                </button>
            </div>
            <div>
                <img :src="bookCover" alt="Book Cover" class="book-cover" />
            </div>
        </div>

        <!-- Book Content -->
        <div class="book-content">
            <h2 class="f716 mt-5">{{ book.title }}</h2>
            <h4 class="f616">{{ book.author }}</h4>
            <div class="text-start px-md-5 mt-md-5">
                <h3 class="f716 mt-3">About the Book</h3>
                <p class="intro">
                    In this captivating and thought-provoking novel, readers are
                    transported into a world where the boundaries of reality and
                    imagination blur. With richly drawn characters and a plot that
                    twists and turns, this book explores themes of love, loss, and
                    the complexity of human nature. As the story unfolds, secrets
                    are revealed, relationships are tested, and the characters are
                    forced to confront their deepest fears and desires.
                </p>
            </div>
            
            <router-link :to="'/series/' + book.slug + '/episode'" class="book-link">
            <button class="btn btn-brown mt-2">Start Reading</button>
            </router-link>
        </div>
    </div>

    <!-- If book is not found -->
    <div v-else class="text-center mt-5">
        <h2>Book not found</h2>
        <router-link to="/" class="btn btn-primary">Go Back</router-link>
    </div>
</template>
