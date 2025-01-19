import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgRXwvZgx9ZPDgPw4MGtqPrdRPoygZixc",
  authDomain: "cognisyncc.firebaseapp.com",
  projectId: "cognisyncc",
  storageBucket: "cognisyncc.firebasestorage.app",
  messagingSenderId: "41165694026",
  appId: "1:41165694026:web:e1863d092bd574bce6f2b3",
  measurementId: "G-SYSXX18K98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export Firebase Authentication methods
export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };
