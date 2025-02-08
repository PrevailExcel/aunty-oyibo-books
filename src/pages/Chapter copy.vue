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
    <div class="container py-4">
        <!-- App Bar -->
        <div class="d-flex align-items-center justify-content-between mb-5">
            <button class="btn p-0" @click="$router.go(-1)">
                <img src="/icons/back1.png" width="24" alt="Back" />
            </button>
            <h2 class="mb-0 f716">{{ book?.title || 'Loading...' }}</h2>
            <div class="mb-4">
                <button class="btn p-0 me-3">
                    <img src="/icons/device1.png" width="24" alt="Back" />
                </button>
                <button class="btn p-0">
                    <img src="/icons/menu1.png" width="24" alt="Back" />
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

            A tale of resilience, hope, and the unexpected paths that life
            often takes, this book will resonate with anyone who has ever
            grappled with the challenges of self-discovery and the power
            of transformation. Whether you are looking for an emotional
            journey or a gripping narrative, this book promises to leave a
            lasting impression.


            In this captivating and <i>thought-provoking novel,</i> readers are
            transported into a world where the boundaries of reality and
            imagination blur. With richly drawn characters and a plot that
            twists and turns, this book explores themes of love, loss, and
            the complexity of human nature. As the story unfolds, secrets
            are revealed, relationships are tested, and the characters are
            forced to confront their deepest fears and desires.

            A tale of resilience, hope, and the unexpected paths that life
            often takes, this book will resonate with anyone who has ever
            grappled with the challenges of self-discovery and the power
            of transformation. Whether you are looking for an emotional
            journey or a gripping narrative, this book promises to leave a
            lasting impression.


            In this captivating and thought-provoking novel, readers are
            transported into a world where the boundaries of reality and
            imagination blur. With richly drawn characters and a plot that
            twists and turns, this book explores themes of love, loss, and
            the complexity of human nature. As the story unfolds, secrets
            are revealed, relationships are tested, and the characters are
            forced to confront their deepest fears and desires.

            A tale of resilience, hope, and the unexpected paths that life
            often takes, this book will resonate with anyone who has ever
            grappled with the challenges of self-discovery and the power
            of transformation. Whether you are looking for an emotional
            journey or a gripping narrative, this book promises to leave a
            lasting impression.


            In this captivating and thought-provoking novel, readers are
            transported into a world where the boundaries of reality and
            imagination blur. With richly drawn characters and a plot that
            twists and turns, this book explores themes of love, loss, and
            the complexity of human nature. As the story unfolds, secrets
            are revealed, relationships are tested, and the characters are
            forced to confront their deepest <b>fears and desires.</b>

            A tale of resilience, hope, and the unexpected paths that life
            often takes, this book will resonate with anyone who has ever
            grappled with the challenges of self-discovery and the power
            of transformation. Whether you are looking for an emotional
            journey or a gripping narrative, this book promises to leave a
            lasting impression.


        </div>
    </div>














</template>
