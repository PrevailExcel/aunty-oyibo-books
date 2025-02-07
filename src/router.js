import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue"

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
