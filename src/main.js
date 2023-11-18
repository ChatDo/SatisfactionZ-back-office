import './assets/main.css'
import {createApp} from "vue";
import LoginPage from "@/components/LoginPage.vue";
import Home from "@/components/Home.vue";
import App from './App.vue';

import {createRouter, createWebHistory} from 'vue-router'


const app = createApp(App)

const routes = [
    { path: '/login', component: LoginPage },
    { path: '/dashboard', component: Home },
    { path: '/', component: Home },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

app.use(router)

app.mount('#app')
