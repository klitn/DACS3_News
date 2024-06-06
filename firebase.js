import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY_jS3zLByz6Np7rlN9m-hY0tYLW-pNXQ",
  authDomain: "dacs3-7cb61.firebaseapp.com",
  projectId: "dacs3-7cb61",
  storageBucket: "dacs3-7cb61.appspot.com",
  messagingSenderId: "80652868800",
  appId: "1:80652868800:web:dd5b5e0bd21179441aa125"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };