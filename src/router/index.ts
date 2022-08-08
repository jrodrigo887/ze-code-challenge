import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
import Home from '../pages/HomePage.vue';
import ProductPage from '@/pages/ProductPage.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'home', component: Home,  },
    { path: '/products', name: 'products', component: ProductPage },
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
