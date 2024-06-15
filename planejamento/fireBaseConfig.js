import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDIraNoltnTG6mIz51SGo2Xni5BfgAqnIQ",
  authDomain: "my-world-tour-bc748.firebaseapp.com",
  projectId: "my-world-tour-bc748",
  storageBucket: "my-world-tour-bc748.appspot.com",
  messagingSenderId: "180890536412",
  appId: "1:180890536412:web:5606b457e76543e6de6719",
  measurementId: "G-5Y3BFYQJQP"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db };
