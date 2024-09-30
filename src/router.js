import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomeView.vue';
import Details from '@/views/DetailsView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/post/:id',
        name: 'Details',
        component: Details,

    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;