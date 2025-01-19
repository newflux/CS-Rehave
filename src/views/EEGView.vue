<template>
    <div class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">EEG Setup Instructions</h1>
          <p class="hero-description">
            1. Ensure the EEG cap is properly connected to the Arduino.<br>
            2. Place the cap on your head, making sure all electrodes are in contact with your scalp.<br>
            3. Open the serial monitor to verify the connection.<br>
            4. Click "Done" once everything is set up.
          </p>
          <button class="button-primary" @click="handleDone">Done</button>
        </div>
        <div class="hero-video">
          <img src="/assets/eeg.jpg" alt="EEG Setup Illustration">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      handleDone() {
        // Logic to navigate to the next page or start EEG recording
        this.$router.push('/eeg-recording');
      }
    }
  };
  </script>
  
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
  gap: 6rem; /* Increase the gap between content and image */
}
  
  .hero-content {
  flex: 1;
  text-align: left;
  margin-left: 2rem; /* Add more left margin */
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
  max-width: 40%; /* Limit the width to make it more portrait-like */
}
  
.hero-video img {
  width: 100%; /* Make the image fill the container */
  height: auto;
  max-height: 80vh; /* Limit the height to make it more portrait-like */
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  object-fit: cover; /* Ensure the image covers the area without distortion */
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
  </style>
