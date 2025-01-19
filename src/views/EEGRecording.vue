<template>
    <div class="eeg-recording-section">
      <div class="eeg-container">
        <h1 class="eeg-title">Real-Time EEG Recording</h1>
        <div class="eeg-chart">
          <apexchart
            ref="eegChart"
            type="line"
            height="450"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
        <div class="eeg-controls">
          <button
            class="button-primary"
            @click="startRecording"
            :disabled="isRecording || isTimerRunning || isLoading"
          >
            <span v-if="isLoading">Saving...</span>
            <span v-else>Start Recording</span>
          </button>
          <button
            class="button-secondary"
            @click="stopRecording"
            :disabled="!isRecording || isLoading"
          >
            Stop Recording
          </button>
        </div>
        <p v-if="isRecording" class="recording-status">
         Time remaining: {{ formattedTime }}
        </p>
        <p v-else class="recording-status">Recording stopped.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  import { auth, db, collection, addDoc } from '../firebase'; // Import Firebase methods
  
  export default {
    components: {
      apexchart: VueApexCharts,
    },
    setup() {
      const isRecording = ref(false);
      const isTimerRunning = ref(false);
      const isLoading = ref(false); // Loading state
      const dataInterval = ref(null);
      const timerInterval = ref(null);
      const timeRemaining = ref(300); // 5 minutes in seconds
      const user = ref(auth.currentUser); // Get current user
  
      const series = ref([
        { name: 'Alpha Waves', data: [] },
        { name: 'Beta Waves', data: [] },
        { name: 'Gamma Waves', data: [] },
      ]);
  
      const chartOptions = ref({
        chart: {
          id: 'realtime',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          type: 'numeric',
          labels: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: '#fff',
            },
          },
          title: {
            text: 'Amplitude',
            style: {
              color: '#fff',
            },
          },
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        colors: ['#4FD1C5', '#FF6B6B', '#F6E05E'],
        grid: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      });
  
      // Simulate EEG data (alpha, beta, gamma waves)
      const simulateEEGData = () => {
        const alpha = Math.sin(Date.now() / 1000) * 10 + 15; // Alpha waves (8-12 Hz)
        const beta = Math.sin(Date.now() / 500) * 5 + 20; // Beta waves (12-30 Hz)
        const gamma = Math.sin(Date.now() / 250) * 3 + 25; // Gamma waves (30-100 Hz)
        return { alpha, beta, gamma };
      };
  
      // Start recording and visualizing data
      const startRecording = () => {
        if (isRecording.value || isTimerRunning.value) return;
  
        isRecording.value = true;
        isTimerRunning.value = true;
        series.value = [
          { name: 'Alpha Waves', data: [] },
          { name: 'Beta Waves', data: [] },
          { name: 'Gamma Waves', data: [] },
        ];
  
        // Start the countdown timer
        timerInterval.value = setInterval(() => {
          timeRemaining.value -= 1;
          if (timeRemaining.value <= 0) {
            stopRecording();
          }
        }, 1000);
  
        // Simulate real-time data updates every 100ms
        dataInterval.value = setInterval(() => {
          const newData = simulateEEGData();
  
          // Add new data points
          series.value[0].data.push({ x: Date.now(), y: newData.alpha });
          series.value[1].data.push({ x: Date.now(), y: newData.beta });
          series.value[2].data.push({ x: Date.now(), y: newData.gamma });
  
          // Keep only the last 50 data points for smooth visualization
          if (series.value[0].data.length > 50) {
            series.value[0].data.shift();
            series.value[1].data.shift();
            series.value[2].data.shift();
          }
        }, 100);
      };
  
      // Generate a report from EEG data
      const generateReport = (data) => {
        const alphaAvg = data.alphaWaves.reduce((sum, val) => sum + val, 0) / data.alphaWaves.length;
        const betaAvg = data.betaWaves.reduce((sum, val) => sum + val, 0) / data.betaWaves.length;
        const gammaAvg = data.gammaWaves.reduce((sum, val) => sum + val, 0) / data.gammaWaves.length;
  
        return {
          alphaAvg: alphaAvg.toFixed(2),
          betaAvg: betaAvg.toFixed(2),
          gammaAvg: gammaAvg.toFixed(2),
        };
      };
  
      // Stop recording
      const stopRecording = () => {
        if (!user.value) {
          console.error('User not authenticated');
          return;
        }
  
        // Immediately stop the intervals and reset state
        isRecording.value = false;
        isTimerRunning.value = false;
        clearInterval(dataInterval.value);
        clearInterval(timerInterval.value);
  
        // Prepare data to save
        const recordingData = {
          alphaWaves: series.value[0].data.map((point) => point.y),
          betaWaves: series.value[1].data.map((point) => point.y),
          gammaWaves: series.value[2].data.map((point) => point.y),
          timestamp: new Date().toISOString(),
          userId: user.value.uid, // Include user ID
        };
  
        // Generate and display report
        const report = generateReport(recordingData);
        console.log('Report:', report);
        alert(`Report:\nAlpha: ${report.alphaAvg}\nBeta: ${report.betaAvg}\nGamma: ${report.gammaAvg}`);
  
        // Save data to Firestore (async)
        saveRecordingToFirestore(recordingData);
  
        timeRemaining.value = 300; // Reset timer
      };
  
      // Save recording data to Firestore
      const saveRecordingToFirestore = async (recordingData) => {
        isLoading.value = true; // Start loading
        try {
          const docRef = await addDoc(collection(db, 'eegRecordings'), recordingData);
          console.log('Recording saved with ID:', docRef.id);
          alert('Recording saved successfully!');
        } catch (error) {
          console.error('Error saving recording:', error);
          alert('Error saving recording. Please try again.');
        } finally {
          isLoading.value = false; // Stop loading
        }
      };
  
      // Format time remaining (mm:ss)
      const formattedTime = computed(() => {
        const minutes = Math.floor(timeRemaining.value / 60);
        const seconds = timeRemaining.value % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      });
  
      return {
        isRecording,
        isTimerRunning,
        isLoading,
        series,
        chartOptions,
        startRecording,
        stopRecording,
        formattedTime,
      };
    },
  };
  </script>
  
  <style scoped>
  .eeg-recording-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    background-color: #1a1a1a;
    padding: 2rem;
  }
  
  .eeg-container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  
  .eeg-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    font-family: 'Space Mono', monospace;
    color: #4FD1C5;
  }
  
  .eeg-chart {
    margin: 2rem 0;
  }
  
  .eeg-controls {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .button-primary,
  .button-secondary {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 9999px;
    text-decoration: none;
    transition: all 0.3s ease;
    font-weight: 500;
    cursor: pointer;
  }
  
  .button-primary {
    background-color: #4FD1C5;
    color: #1D1D1D;
  }
  
  .button-primary:disabled {
    background-color: #38B2AC;
    cursor: not-allowed;
  }
  
  .button-secondary {
    border: 1px solid #FF6B6B;
    color: #FF6B6B;
  }
  
  .button-secondary:disabled {
    background-color: #FF6B6B;
    color: #1D1D1D;
    cursor: not-allowed;
  }
  
  .button-primary:hover:not(:disabled) {
    background-color: #38B2AC;
    transform: translateY(-2px);
  }
  
  .button-secondary:hover:not(:disabled) {
    background-color: #FF6B6B;
    color: #1D1D1D;
    transform: translateY(-2px);
  }
  
  .recording-status {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    font-family: 'Space Mono', monospace;
  }
  </style>
