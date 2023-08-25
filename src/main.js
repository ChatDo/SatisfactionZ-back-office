import './assets/main.css'
import {createApp, defineComponent} from "vue";
import LoginPage from "@/components/LoginPage.vue";
import Home from "@/components/Home.vue";
import App from './App.vue';

import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Configuration from "@/components/Configuration.vue";


const app = createApp(App)

const routes = [
    { path: '/login', component: LoginPage },
    { path: '/dashboard', component: Home },
    { path: '/', component: Home },
    // { path: '/configuration', component: Configuration },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

app.use(router)

app.mount('#app')