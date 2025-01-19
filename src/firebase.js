import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore'; // Add Firestore methods

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

// Initialize Firestore
const db = getFirestore(app);

// Export Firebase Authentication and Firestore methods
export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  db,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
};
