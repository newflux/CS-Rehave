import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router

// Create the Vue app
const app = createApp(App);

// Use the router
app.use(router);

// Mount the app
app.mount('#app');
