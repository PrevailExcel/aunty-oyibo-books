<template>
    <div class="bg-brown mt-2 text-white p-4 d-flex align-items-center justify-content-between">
        <div class="pe-5 pt-3 pt-md-0">
            <transition name="slide" mode="out-in">
                <blockquote class="quote mb-0" :key="currentIndex">
                    <p>“{{ quotes[currentIndex].text }}”</p>
                    <footer class="blockquote-footer text-white mt-3">
                        {{ quotes[currentIndex].author }}
                    </footer>
                </blockquote>
            </transition>
        </div>
        <img src="/images/quote.png" alt="Illustration" class="text-end ms-2 img-fluid" width="100">
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const quotes = ref([
    {
        "text": "Books and Doors are the same thing. You open them, and you go through into another world.",
        "author": "Jeanette Winterson"
    },
    {
        "text": "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
        "author": "George R.R. Martin"
    },
    {
        "text": "So many books, so little time. Each one opens a door to a world waiting to be explored.",
        "author": "Frank Zappa"
    },
    {
        "text": "Once you learn to read, you will be forever free. Books unlock the doors of the mind.",
        "author": "Frederick Douglass"
    },
    {
        "text": "A great book should leave you with many experiences, and slightly exhausted at the end.",
        "author": "William Styron"
    },
    {
        "text": "Books have a unique way of stopping time in a particular moment and saying: Let’s not forget this.",
        "author": "Dave Eggers"
    }
]);

const currentIndex = ref(0);
let interval = null;

onMounted(() => {
    interval = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % quotes.value.length;
    }, 5000); // Change every 5 seconds
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<style scoped>
/* Slide transition */
.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
}

.slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}
</style>