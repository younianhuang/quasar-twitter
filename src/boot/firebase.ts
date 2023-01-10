// Import the functions you need from the SDKs you need
import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { TweetService } from 'src/tweet/TweetService';
import { FirebaseTweetRepository } from '../tweet/data/FirebaseTweetRepository';
import { useTweetStore } from './../stores/TweetStore';
import { useAuthStore } from './../stores/AuthStore';

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

export default boot(({ app }) => {
  const repository = new FirebaseTweetRepository(db);
  const tweetService = new TweetService(
    repository,
    useTweetStore(),
    useAuthStore()
  );
  app.provide<TweetService>('TweetService', tweetService);
});
