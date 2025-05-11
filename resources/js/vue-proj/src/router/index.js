import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from "@/components/HomeComponent.vue";
import AboutComponent from "@/components/AboutComponent.vue";
import UserComponent from "@/components/UserComponent.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeComponent,
    },
    {
        path: '/about',
        name: 'About',
        component: AboutComponent,
    },
    {
        path: '/users',
        name: 'Users',
        component: UserComponent,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
