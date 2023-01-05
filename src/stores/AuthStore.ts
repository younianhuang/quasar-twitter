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
} from 'firebase/auth';

const firebaseAuth = getAuth();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // auth: new Auth(),
    user: new User(),
  }),
  getters: {},
  actions: {
    async login(email: string, password: string): Promise<void> {
      const userCred = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      this.user.id = userCred.user.uid;
      this.user.email = userCred.user.email ?? '';
      this.user.name = email.substring(0, email.indexOf('@'));
      this.user.online = true;
    },

    async logout(): Promise<void> {
      await signOut(firebaseAuth);
      this.user = new User();
      this.user.online = false;
    },

    async singup(email: string, password: string): Promise<void> {
      const userCred = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      this.user.id = userCred.uid;
      this.user.email = userCred.email ?? '';
      this.user.online = true;
    },
  },
});
