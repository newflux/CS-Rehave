<template>
  <div class="science-view">
    <!-- Header -->
    <header class="science-header" data-aos="fade-down" data-aos-duration="1000">
      <h1>Our Research</h1>
    </header>

    <!-- Content Section -->
    <section class="science-content">
      <!-- Text Content -->
      <div class="content-text" data-aos="fade-right" data-aos-duration="1000">
        <h2>Electrical activity in the brain: EEG studies</h2>
        <p>
          Electroencephalography measures fluctuations in electrical current at the scalp, showing rhythmic brain activity (brainwaves) and how this kind of activity shifts in response to Brain.fm music.
        </p>
      </div>

      <!-- Image Content -->
      <div class="content-image" data-aos="fade-left" data-aos-duration="1000">
        <img src="/assets/research1.jpg" alt="EEG Studies" />
      </div>
    </section>

    <!-- Buttons -->
    <div class="button-group" data-aos="fade-up" data-aos-duration="1000">
      <router-link to="/" class="button-back">Back</router-link>
      <router-link to="/login" class="button-signin">Sign In</router-link>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'ScienceView',
  mounted() {
    AOS.init({
      duration: 800,
      easing: 'ease',
      once: true,
    });
  },
};
</script>

<style scoped>
.science-view {
  padding: 4rem 2rem;
  background-color: #1a1a1a; /* Light shade of black */
  color: #ffffff;
  font-family: 'Space Mono', monospace;
}

.science-header {
  text-align: center;
  margin-bottom: 4rem;
}

.science-header h1 {
  font-size: 2.5rem; /* Reduced size */
  color: #4FD1C5;
}

.science-content {
  max-width: 1200px; /* Reduced width for better alignment */
  margin: 0 auto;
  display: flex;
  gap: 4rem;
  align-items: center;
}

.content-text {
  flex: 1;
}

.content-text h2 {
  font-size: 1.75rem; /* Reduced size */
  color: #4FD1C5;
  margin-bottom: 1rem;
}

.content-text p {
  font-size: 1rem; /* Reduced size */
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

.content-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-image img {
  max-width: 80%; /* Reduced size */
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.button-group {
  max-width: 1200px;
  margin: 4rem auto 0;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.button-back, .button-signin {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
  cursor: pointer;
}

.button-back {
  background-color: #4FD1C5;
  color: #1D1D1D;
}

.button-back:hover {
  background-color: #38B2AC;
  transform: translateY(-2px);
}

.button-signin {
  background-color: #FF6B6B;
  color: #1D1D1D;
}

.button-signin:hover {
  background-color: #e55a5a;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .science-content {
    flex-direction: column;
    gap: 2rem;
  }

  .content-text {
    text-align: center;
  }

  .content-image {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .science-header h1 {
    font-size: 2rem;
  }

  .content-text h2 {
    font-size: 1.5rem;
  }

  .content-text p {
    font-size: 0.9rem;
  }

  .button-group {
    justify-content: center;
  }
}
</style>
