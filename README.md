# **Rehave: Cognitive Optimization with EEG and Music**

Rehave is a digital rehabilitation platform designed to enhance cognitive performance by integrating real-time EEG data with personalized music recommendations. By analyzing brainwave activity, the system dynamically selects music tracks to improve focus, relaxation, and overall cognitive function.


![Screenshot 2025-02-09 231649](https://github.com/user-attachments/assets/ce3b5fe0-6772-4eb6-8d80-794116983e67)

------------

## **Features**
### 1. Real-Time EEG Recording
  - Visualizes alpha, beta, and gamma brainwave activity in real time.
    ![Screenshot 2025-02-09 233306](https://github.com/user-attachments/assets/eb87566b-7987-44a8-ad23-35914fdce9f3)


### 2. Music for Cognitive Optimization
  - Recommends music dynamically based on dominant brainwave activity.
    ![Screenshot 2025-02-05 134030](https://github.com/user-attachments/assets/c01f24a8-6d28-4954-828a-2158474c4056)

### 3. Session Reports
  - Provides detailed reports comparing baseline and improved brainwave activity.
    ![Screenshot 2025-02-05 134125](https://github.com/user-attachments/assets/0771055d-b3db-4185-98eb-83ea04b9f2fc)


### 4. User-Friendly Interface
 - Includes simple controls for recording EEG data, selecting music, and generating reports.

### 5. Firebase Integration
 - Stores and retrieves EEG recording data using Firebase Firestore.
 - Automatically manages storage by deleting old recordings.
    ![Screenshot 2025-02-09 233527](https://github.com/user-attachments/assets/a5e24aec-ecf2-4bfc-8410-82986661b212)


------------
## Technologies Used
### 1. Frontend
- Vue.js with Vue Router and Vuex for state management
- ApexCharts for EEG data visualization
- WaveSurfer.js for audio waveform display
### Backend
- Firebase Firestore for data storage
- Firebase Authentication for user login
### APIs and Styling
- Audius API for fetching and playing music tracks
- SCSS for modular and maintainable styling


------------

## How It Works
1. **EEG Recording**: Users start a session, and real-time EEG data is displayed.
2. **Baseline Calculatio**n: The system analyzes alpha, beta, and gamma waves.
3. ** Music Recommendation**: Tracks are selected based on dominant brainwave activity.
4. **Session Report**: A summary visualizes cognitive improvement post-session.
   ![WhatsApp Image 2025-02-10 at 01 27 02](https://github.com/user-attachments/assets/f67018ee-e96b-48fb-81f7-9aa61ea218ed)





------------

## Installation
#### Clone the Repository
`git clone https://github.com/your-username/rehave.git`

`cd rehave`

`npm install`

#### Firebase Setup
1. Create a Firebase project and configure src/firebase.js.
2. Enable Firestore and Authentication in the Firebase Console.

#### Audius API Setup
Replace `YOUR_AUDIUS_API_KEY` in MusicView.vue with your` actual API key.`

#### Run the Project

`npm run serve`


------------

## Contributing
We welcome contributions to improve ReHave. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit changes with clear descriptions.
4. Submit a pull request for review.



