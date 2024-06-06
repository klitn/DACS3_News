import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMx1YiapkxqJrMwdC3h8NpFQLY8SH5bfE",
  authDomain: "dacs3-8ff3d.firebaseapp.com",
  databaseURL: "https://dacs3-8ff3d-default-rtdb.firebaseio.com",
  projectId: "dacs3-8ff3d",
  storageBucket: "dacs3-8ff3d.appspot.com",
  messagingSenderId: "114980654660",
  appId: "1:114980654660:web:c57af406aad8f4612bb611"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };