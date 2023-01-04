import { defineStore } from 'pinia';

export class User {
  id = '';
  name = '';
  email = '';
  online = false;
}

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  Unsubscribe,
} from 'firebase/auth';

const firebaseAuth = getAuth();
let unsubscribe = null as Unsubscribe | null;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // auth: new Auth(),
    user: new User(),
  }),
  getters: {},
  actions: {
    async login(email: string, password: string): Promise<void> {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    },

    async logout(): Promise<void> {
      await signOut(firebaseAuth);
    },

    async singup(email: string, password: string): Promise<void> {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    },

    init(): void {
      if (!unsubscribe) {
        unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
          if (user) {
            // User is signed in
            this.user.id = user.uid;
            this.user.email = user.email ?? '';
          } else {
            // User is signed out
            this.user = new User();
          }
        });
      }
    },
    shutdown(): void {
      if (unsubscribe) {
        unsubscribe();
      }
    },
  },
});
