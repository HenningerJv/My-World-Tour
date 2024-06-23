// fireBaseConfig.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDIraNoltnTG6mIz51SGo2Xni5BfgAqnIQ",
  authDomain: "my-world-tour-bc748.firebaseapp.com",
  projectId: "my-world-tour-bc748",
  storageBucket: "my-world-tour-bc748.appspot.com",
  messagingSenderId: "180890536412",
  appId: "1:180890536412:web:5606b457e76543e6de6719",
  measurementId: "G-5Y3BFYQJQP"
};

// Inicializa o Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
