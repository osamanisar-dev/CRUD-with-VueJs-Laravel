import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from "@/components/HomeComponent.vue";
import UserComponent from "@/components/UserComponent.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeComponent,
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
