import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import ScienceView from './views/ScienceView.vue';
import LoginView from './views/LoginView.vue'; // Import LoginView

const routes = [
  { path: '/', component: HomeView },
  { path: '/science', component: ScienceView },
  { path: '/login', component: LoginView }, // Define the /login route
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; // Export the router
