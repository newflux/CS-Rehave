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
            :disabled="isRecording || isTimerRunning"
          >
            Start Recording
          </button>
          <button
            class="button-secondary"
            @click="stopRecording"
            :disabled="!isRecording"
          >
            Stop Recording
          </button>
          <button
            class="button-report"
            @click="generateReport"
            :disabled="!isRecordingStopped"
          >
            Generate Report
          </button>
        </div>
        <p v-if="isRecording" class="recording-status">
          Time remaining: {{ formattedTime }}
        </p>
        <p v-else class="recording-status">Recording stopped.</p>
      </div>
  
      <!-- Report Pop-Up -->
      <transition name="slide-up">
        <div v-if="report" class="report-popup">
          <div class="report-content">
            <div class="report-percentage" :style="{ color: report.color }">
              {{ report.cognitiveCapacity }}%
            </div>
            <div class="report-details">
              <p>Alpha Waves: {{ report.alphaAvg }}</p>
              <p>Beta Waves: {{ report.betaAvg }}</p>
              <p>Gamma Waves: {{ report.gammaAvg }}</p>
            </div>
          </div>
          <button class="button-close" @click="report = null">Close</button>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  import { db, collection, addDoc, query, where, getDocs, deleteDoc } from '../firebase'; // Import Firestore methods
  
  export default {
    components: {
      apexchart: VueApexCharts,
    },
    setup() {
      const isRecording = ref(false);
      const isTimerRunning = ref(false);
      const isRecordingStopped = ref(false); // New state for report button
      const dataInterval = ref(null);
      const timerInterval = ref(null);
      const timeRemaining = ref(300); // 5 minutes in seconds
      const report = ref(null); // Store report data
  
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
        isRecordingStopped.value = false; // Reset report state
        report.value = null; // Clear previous report
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
  
      // Stop recording and save data to Firestore
      const stopRecording = async () => {
        isRecording.value = false;
        isTimerRunning.value = false;
        isRecordingStopped.value = true; // Enable report button
        clearInterval(dataInterval.value);
        clearInterval(timerInterval.value);
  
        // Prepare data to save
        const recordingData = {
          alphaWaves: series.value[0].data.map((point) => point.y),
          betaWaves: series.value[1].data.map((point) => point.y),
          gammaWaves: series.value[2].data.map((point) => point.y),
          timestamp: new Date().toISOString(),
        };
  
        console.log('Prepared data:', recordingData); // Log the data
  
        // Save data to Firestore
        try {
          const docRef = await addDoc(collection(db, 'eegRecordings'), recordingData);
          console.log('Recording saved with ID:', docRef.id);
        } catch (error) {
          console.error('Error saving recording:', error);
        }
  
        timeRemaining.value = 300; // Reset timer
  
        // Delete old data
        deleteOldData();
      };
  
      // Calculate cognitive capacity percentage
      const calculateCognitiveCapacity = (alphaAvg, betaAvg, gammaAvg) => {
        // Formula: Cognitive capacity = (alpha + beta + gamma) / 3
        const capacity = (alphaAvg + betaAvg + gammaAvg) / 3;
        return Math.min(100, Math.max(0, Math.round(capacity))); // Clamp between 0 and 100
      };
  
      // Generate a report from EEG data
      const generateReport = () => {
        const alphaAvg = parseFloat(
          (series.value[0].data.reduce((sum, point) => sum + point.y, 0) / series.value[0].data.length).toFixed(2)
        );
        const betaAvg = parseFloat(
          (series.value[1].data.reduce((sum, point) => sum + point.y, 0) / series.value[1].data.length).toFixed(2)
        );
        const gammaAvg = parseFloat(
          (series.value[2].data.reduce((sum, point) => sum + point.y, 0) / series.value[2].data.length).toFixed(2)
        );
  
        const cognitiveCapacity = calculateCognitiveCapacity(alphaAvg, betaAvg, gammaAvg);
  
        // Determine color based on cognitive capacity
        let color;
        if (cognitiveCapacity < 40) {
          color = '#FF6B6B'; // Red
        } else if (cognitiveCapacity < 70) {
          color = '#F6E05E'; // Yellow
        } else {
          color = '#4FD1C5'; // Green
        }
  
        report.value = {
          alphaAvg,
          betaAvg,
          gammaAvg,
          cognitiveCapacity,
          color,
        };
      };
  
      // Delete old data (older than 7 days)
      const deleteOldData = async () => {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 1); // 1 days ago
  
        const q = query(collection(db, 'eegRecordings'), where('timestamp', '<', cutoffDate.toISOString()));
        const querySnapshot = await getDocs(q);
  
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
          console.log('Deleted old recording:', doc.id);
        });
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
        isRecordingStopped,
        series,
        chartOptions,
        startRecording,
        stopRecording,
        generateReport,
        formattedTime,
        report,
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
  .button-secondary,
  .button-report {
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
  
  .button-report {
    background-color: #F6E05E;
    color: #1D1D1D;
  }
  
  .button-report:disabled {
    background-color: #D69E2E;
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
  
  .button-report:hover:not(:disabled) {
    background-color: #D69E2E;
    transform: translateY(-2px);
  }

  .report-popup {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #1a1a1a;
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
}
  
  .recording-status {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    font-family: 'Space Mono', monospace;
  }
  
  .report-section {
    margin-top: 2rem;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .report-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}
  
.report-percentage {
  font-size: 3rem;
  font-weight: bold;
  margin-right: 2rem;
}
  
.report-details {
  text-align: left;
}
  
.report-details p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
}

.button-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #FF6B6B;
  cursor: pointer;
  font-size: 1rem;
}
  
  /* Slide-up animation */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}
  
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
  </style>
