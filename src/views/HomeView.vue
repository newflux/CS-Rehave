<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <!-- Hero Content -->
        <div class="hero-content" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <h2 class="hero-title">Re-Have what you lost</h2>
          <div class="hero-description">
            <p>Advanced digital rehabilitation combining innovative 
               hardware and clinical methodologies for enhanced 
               cognitive performance.</p>
          </div>
          <div class="button-group">
            <router-link to="/login" class="button-primary">Try for free</router-link>
            <router-link to="/science" class="button-secondary">See our science</router-link>
          </div>
        </div>

        <!-- Hero Video -->
        <div class="hero-video" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400">
          <video autoplay muted loop>
            <source src="/assets/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-24">
      <div class="features-container">
        <!-- Feature 1 -->
        <div class="feature-block" data-aos="fade-right" data-aos-duration="1000">
          <div class="feature-content">
            <h2>Real-time Cognitive Monitoring</h2>
            <p>CogniTrack empowers individuals to understand their mental performance in real-time, utilizing advanced EEG technology to measure frontal, parietal, temporal, and occipital lobe activity.</p>
          </div>
          <div class="feature-image">
            <img src="/assets/brain-scan.png" alt="Brain Scanning Technology" />
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="feature-block reverse" data-aos="fade-left" data-aos-duration="1000">
          <div class="feature-content">
            <h2>Scientific Collaboration</h2>
            <p>At Digital Rehab, we partner with leading neuroscience researchers to develop personalized cognitive enhancement protocols.</p>
          </div>
          <div class="feature-image">
            <img src="/assets/research.png" alt="Scientific Research" />
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="feature-block" data-aos="fade-right" data-aos-duration="1000">
          <div class="feature-content">
            <h2>Digital Wellness Solutions</h2>
            <p>Modern technology often depletes our cognitive resources. Our advanced assessment tools measure this digital impact, providing you with actionable steps to reclaim your mental capacity.</p>
          </div>
          <div class="feature-image">
            <img src="/assets/digital-wellness.png" alt="Digital Wellness" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: #1a1a1a; /* Light shade of black */
}

.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

.hero-content {
  flex: 1;
  text-align: left;
}

.hero-title {
  font-size: 2.5rem; /* Reduced size */
  font-weight: bold;
  margin-bottom: 1.5rem; /* Adjusted spacing */
  margin-top: -7.5rem;
  line-height: 1.1;
  white-space: nowrap;
  font-family: 'Space Mono', monospace;
}

.hero-description {
  font-size: 1rem; /* Reduced size */
  max-width: 600px; /* Adjusted width */
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem; /* Adjusted spacing */
  font-family: 'Space Mono', monospace;
}

.button-group {
  display: flex;
  gap: 1.5rem;
}

.button-primary, .button-secondary {
  padding: 0.75rem 1.5rem; /* Same size as other features */
  font-size: 1rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.button-primary {
  background-color: #4FD1C5;
  color: #1D1D1D;
}

.button-secondary {
  border: 1px solid #FF6B6B;
  color: #FF6B6B;
}

.button-primary:hover {
  background-color: #38B2AC;
  transform: translateY(-2px);
}

.button-secondary:hover {
  background-color: #FF6B6B;
  color: #1D1D1D;
  transform: translateY(-2px);
}

.hero-video {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-top: -6rem;
}

.hero-video video {
  max-width: 105%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

@media (max-width: 1024px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .hero-content {
    text-align: center;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-video {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-container {
    padding: 0 2rem;
  }

  .hero-title {
    font-size: 1.75rem;
    white-space: normal;
  }

  .hero-description {
    font-size: 0.9rem;
  }
}

.features-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 4rem;
}

.feature-block {
  display: flex;
  align-items: center;
  gap: 4rem;
  margin-bottom: 8rem;
}

.feature-block.reverse {
  flex-direction: row-reverse;
}

.feature-content {
  flex: 1;
}

.feature-content h2 {
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  color: #4FD1C5;
}

.feature-content p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
}

.feature-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.feature-image img {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

@media (max-width: 1024px) {
  .feature-block {
    flex-direction: column;
    gap: 2rem;
  }

  .feature-block.reverse {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .features-container {
    padding: 0 2rem;
  }
}
</style>