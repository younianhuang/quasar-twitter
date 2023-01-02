// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBDeO1vwOagVnyMAt_3p7-EoQ82bQbDKX4',
  authDomain: 'quasar-twitter.firebaseapp.com',
  projectId: 'quasar-twitter',
  storageBucket: 'quasar-twitter.appspot.com',
  messagingSenderId: '1074739680094',
  appId: '1:1074739680094:web:2fce14d3bad56b5aedb5cf',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
