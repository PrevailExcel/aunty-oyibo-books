import { createWebHistory, createRouter } from 'vue-router';
import Home from './pages/Home.vue';
import Intro from './pages/Intro.vue';
import Chapter from './pages/Chapter.vue';
import Library from './pages/Library.vue';
import Explore from './pages/Explore.vue';
import Profile from './pages/Profile.vue';
import Login from './pages/Login.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { showNav: true },
  },
  {
    path: '/explore',
    name: 'explore',
    component: Explore,
    meta: { showNav: true },
  },
  {
    path: '/library',
    name: 'library',
    component: Library,
    meta: { showNav: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { showNav: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { showNav: false },
  },
  {
    path: '/series/:slug',
    name: 'series',
    component: Intro,
    meta: { showNav: false },
  },
  {
    path: '/series/:slug/episode/:episode',
    name: 'episode',
    component: Chapter,
    meta: { showNav: false },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
