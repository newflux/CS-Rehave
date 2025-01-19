<template>
  <div id="app" class="min-h-screen">
    <!-- Conditionally render the header and navbar -->
    <nav v-if="showHeaderAndFooter" class="fixed w-full z-50">
      <div class="nav-container">
        <!-- Logo Text "rehave" -->
        <div class="logo-text">
          <h1 class="mega-logo">rehave</h1>
        </div>
        <!-- Navigation Links -->
        <div class="nav-links" id="navLinks">
          <ul>
            <li><router-link to="/#about">About</router-link></li>
            <li><router-link to="/#work">Work</router-link></li>
            <li><router-link to="/#journal">Journal</router-link></li>
            <li><router-link to="/#contact">Contact</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Router View -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Conditionally render the footer -->
    <footer v-if="showHeaderAndFooter" class="footer">
      <div class="footer-content">
        <div class="footer-section" data-aos="fade-up" data-aos-duration="800">
          <h3>rehave</h3>
          <p>Restoring cognitive clarity through innovative technology</p>
        </div>

        <div class="footer-section" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
          <h4>Quick Links</h4>
          <ul>
            <li><router-link to="/#about">About Us</router-link></li>
            <li><router-link to="/science">Our Science</router-link></li>
            <li><router-link to="/#research">Research</router-link></li>
            <li><router-link to="/#contact">Contact</router-link></li>
          </ul>
        </div>

        <div class="footer-section" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
          <h4>Contact</h4>
          <p>info@rehave.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Rehave. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'App',
  computed: {
    showHeaderAndFooter() {
      // Hide header and footer for specific routes
      const hideRoutes = ['/login', '/signup', '/eeg', '/eeg-recording']; // Add '/eeg' to hide header and footer
      return !hideRoutes.includes(this.$route.path);
    },
  },
  mounted() {
    AOS.init({
      duration: 800,
      easing: 'ease',
      once: true,
    });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Space Mono', monospace;
  color: #ffffff;
  background-color: black;
  line-height: 1.5;
  overflow-x: hidden;
}

/* Navigation Bar */
.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 4rem; /* Reduced padding to bring nav to the top */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo Text Styling */
.logo-text {
  text-align: left;
}

.mega-logo {
  font-size: 8rem;
  color: #ffffff;
  font-family: 'Space Mono', monospace;
  letter-spacing: -0.05em;
  line-height: 1;
  background: transparent;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  animation: float 3s ease-in-out infinite; /* Added animation */
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Navigation Links */
.nav-links ul {
  display: flex;
  list-style: none;
  gap: 3rem;
}

.nav-links ul li a {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  font-family: 'Space Mono', monospace;
}

.nav-links ul li a:hover {
  color: #4FD1C5;
}

/* Footer */
.footer {
  background-color: #171717;
  padding: 6rem 0 2rem;
  margin-top: 4rem;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 4rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
}

.footer-section h3 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #4FD1C5;
}

.footer-section h4 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.footer-section p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.75rem;
}

.footer-section ul li a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: #4FD1C5;
}

.footer-bottom {
  max-width: 1400px;
  margin: 4rem auto 0;
  padding: 2rem 4rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem 2rem;
  }

  .nav-links ul {
    gap: 1.5rem;
  }

  .mega-logo {
    font-size: 3rem;
  }
}
</style>
