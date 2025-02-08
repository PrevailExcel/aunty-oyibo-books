<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import QuotesCarousel from '../components/QuotesCarousel.vue';

const prefersDarkMode = computed(() =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
);

const getIcon = (name) => {
    return prefersDarkMode.value ? `/icons/${name}.png` : `/icons/${name}1.png`;
};
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
    <div class="container py-4">
        <!-- App Bar -->
        <div class="d-flex align-items-center justify-content-between mb-5">
            <button class="btn p-0" @click="$router.go(-1)">
                <img :src="getIcon('back')" width="24" alt="Back" />
            </button>
            <h2 class="mb-0 f716">{{ book?.title || 'Loading...' }}</h2>
            <div class="mb-0">
                <button class="btn p-0 me-3">
                    <img :src="getIcon('device')" width="24" alt="Back" />
                </button>
                <button class="btn p-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample">
                    <img :src="getIcon('menu')" width="24" alt="Back" />
                </button>
            </div>
        </div>

        <!-- Book Content -->
        <h6 class="episode">Episode 1</h6>
        <div class="main-text mt-4">

            <p>In this captivating and thought-provoking novel, readers are
                transported into a world where the boundaries of reality and
                imagination blur. With richly drawn characters and a plot that
                twists and turns, this book explores themes of love, loss, and
                the complexity of human nature. As the story unfolds, secrets
                are revealed, relationships are tested, and the characters are
                forced to confront their deepest fears and desires.</p>

            <p>A tale of resilience, hope, and the unexpected paths that life
                often takes, this book will resonate with anyone who has ever
                grappled with the challenges of self-discovery and the power
                of transformation. Whether you are looking for an emotional
                journey or a gripping narrative, this book promises to leave a
                lasting impression.</p>


            <p>In this captivating and thought-provoking novel, readers are
                transported into a world where the boundaries of reality and
                imagination blur. With richly drawn characters and a plot that
                twists and turns, this book explores themes of love, loss, and
                the complexity of human nature. As the story unfolds, secrets
                are revealed, relationships are tested, and the characters are
                forced to confront their deepest fears and desires.</p>

            <p>A tale of resilience, hope, and the unexpected paths that life
                often takes, this book will resonate with anyone who has ever
                grappled with the challenges of self-discovery and the power
                of transformation. Whether you are looking for an emotional
                journey or a gripping narrative, this book promises to leave a
                lasting impression.</p>


            <p>In this captivating and <i>thought-provoking novel,</i> readers are
                transported into a world where the boundaries of reality and
                imagination blur. With richly drawn characters and a plot that
                twists and turns, this book explores themes of love, loss, and
                the complexity of human nature. As the story unfolds, secrets
                are revealed, relationships are tested, and the characters are
                forced to confront their deepest fears and desires.</p>

            <p>A tale of resilience, hope, and the unexpected paths that life
                often takes, this book will resonate with anyone who has ever
                grappled with the challenges of self-discovery and the power
                of transformation. Whether you are looking for an emotional
                journey or a gripping narrative, this book promises to leave a
                lasting impression.</p>


            <p>In this captivating and thought-provoking novel, readers are
                transported into a world where the boundaries of reality and
                imagination blur. With richly drawn characters and a plot that
                twists and turns, this book explores themes of love, loss, and
                the complexity of human nature. As the story unfolds, secrets
                are revealed, relationships are tested, and the characters are
                forced to confront their deepest fears and desires.</p>

            <p>A tale of resilience, hope, and the unexpected paths that life
                often takes, this book will resonate with anyone who has ever
                grappled with the challenges of self-discovery and the power
                of transformation. Whether you are looking for an emotional
                journey or a gripping narrative, this book promises to leave a
                lasting impression.</p>


            <p>In this captivating and thought-provoking novel, readers are
                transported into a world where the boundaries of reality and
                imagination blur. With richly drawn characters and a plot that
                twists and turns, this book explores themes of love, loss, and
                the complexity of human nature. As the story unfolds, secrets
                are revealed, relationships are tested, and the characters are
                forced to confront their deepest <b>fears and desires.</b></p>

            <p>A tale of resilience, hope, and the unexpected paths that life
                often takes, this book will resonate with anyone who has ever
                grappled with the challenges of self-discovery and the power
                of transformation. Whether you are looking for an emotional
                journey or a gripping narrative, this book promises to leave a
                lasting impression.</p>
        </div>
    </div>


    <div class="offcanvas offcanvas-start custom-offcanvas" tabindex="-1" id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header "></div>
        <div class="text-center mt-2 align-items-center">
            <div>
                <img :src="book.image" class="rounded-circle circular-photo" height="100" width="100">
            </div>

            <h2 class="f612 mt-3">{{ book.title }}</h2>
            <h4 class="f612">{{ book.author }}</h4>
            <hr class="hr opacity-100">
        </div>
        <div class="offcanvas-body">
            <ul class="list">
                <div class="mb-3"></div>
                <div class="mymenu active mb-5">Episode 1</div>
                <div class="mymenu mb-5">Episode 1</div>
                <div class="mymenu mb-5">Episode 1</div>
                <div class="mymenu mb-5">Episode 1</div>
                <div class="mymenu mb-5">Episode 1</div>
                <div class="mymenu mb-5">Episode 1</div>
            </ul>
        </div>
    </div>
</template>
