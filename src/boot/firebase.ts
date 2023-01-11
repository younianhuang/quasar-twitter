import { AuthService } from './../auth/domain/AuthService';
import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { TweetService, FirebaseTweetRepository } from '../tweet';
import { useTweetStore } from './../stores/TweetStore';
import { useAuthStore } from './../stores/AuthStore';
import { FirebaseAuthClient } from './../auth';
import { getAuth } from 'firebase/auth';

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
const filebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(filebaseApp);

export default boot(({ app }) => {
  const authClient = new FirebaseAuthClient(getAuth(filebaseApp));
  const authStore = useAuthStore();
  const authService = new AuthService(authClient, authStore);
  app.provide<AuthService>('AuthService', authService);

  const repository = new FirebaseTweetRepository(db);
  const tweetService = new TweetService(repository, useTweetStore(), authStore);
  app.provide<TweetService>('TweetService', tweetService);
});
