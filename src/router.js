import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import ScienceView from './views/ScienceView.vue';
import LoginView from './views/LoginView.vue';
import EEGView from './views/EEGView.vue';
import EEGRecording from './views/EEGRecording.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/science', component: ScienceView },
  { path: '/login', component: LoginView },
  { path: '/eeg', component: EEGView },
  { path: '/eeg-recording', component: EEGRecording}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
