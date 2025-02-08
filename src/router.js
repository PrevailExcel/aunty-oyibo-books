import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue"
import Chapter from "./pages/Chapter.vue";
import Intro from "./pages/Intro.vue";

const routes = [
    {
        path: "/",
        alias: "/home",
        name: "home",
        component: Home,
        meta: {
            requiresAuth: false,
            home: true
        },
    },
    {
        path: "/series/:slug",
        name: "series",
        component: Intro,
        meta: {
            requiresAuth: false,
            home: false
        },
    },
    {
        path: "/series/:slug/episode",
        name: "series-episode",
        component: Chapter,
        meta: {
            requiresAuth: false,
            home: false
        },
    },
    {
        path: '/:dummy(.*)*',
        component: {
            setup() {
                return () => '404 - Page not found'
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (Auth.check()) {
            next();
            return;
        } else {
            router.push('/login');
        }
    } else {
        next();
    }
});
export default router;
