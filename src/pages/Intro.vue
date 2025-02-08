<script setup>
import QuotesCarousel from '../components/QuotesCarousel.vue';
const bookCover = "/images/series.png";

const items = [1, 2, 3, 4, 55, 5, 5, 5, 5]; // Replace with actual data if necessary
</script>

<template>
    <div class="d-flex flex-column m-0">
        <!-- Background with Blur and Dark Overlay -->
        <div class="book-cover-background position-relative" :style="{ backgroundImage: `url(${bookCover})` }">
            <div class="overlay"></div>
            <div class="app-bar">
                <button class="btn text-white fs-4" @click="$router.go(-1)">
                    <img src="/icons/back1.png" width="24">
                </button>
            </div>
            <div>
                <img :src="bookCover" alt="Book Cover" class="book-cover" />
            </div>
        </div>

        <!-- Book Content -->
        <div class="book-content">
            <h2 class="f716 mt-5">Storm Warning</h2>
            <h4 class="f616">Ejimadu Prevail C.</h4>
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
            <button class="btn btn-brown mt-2">Start Reading</button>
        </div>
    </div>
</template>
