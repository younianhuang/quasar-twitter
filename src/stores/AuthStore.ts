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
  updateProfile,
} from 'firebase/auth';

const firebaseAuth = getAuth();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // auth: new Auth(),
    user: new User(),
  }),
  getters: {
    isAuthenticated(): boolean {
      return this.user.id !== '';
    },
  },
  actions: {
    async login(email: string, password: string): Promise<void> {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      this.user.id = userCredential.user.uid;
      this.user.email = userCredential.user.email ?? '';
      this.user.name =
        userCredential.user.displayName ??
        email.substring(0, email.indexOf('@'));
      this.user.online = true;
    },

    async logout(): Promise<void> {
      await signOut(firebaseAuth);
      this.user = new User();
      this.user.online = false;
    },

    async singup(email: string, password: string): Promise<void> {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      this.user.id = userCredential.user.uid;
      this.user.email = userCredential.user.email ?? '';
      this.user.name =
        userCredential.user.displayName ??
        email.substring(0, email.indexOf('@'));
      this.user.online = true;
    },

    async updateProfile(
      displayName?: string | null,
      photoURL?: string | null
    ): Promise<void> {
      if (firebaseAuth.currentUser) {
        await updateProfile(firebaseAuth.currentUser, {
          displayName: displayName,
          photoURL: photoURL,
        });

        if (firebaseAuth.currentUser.displayName) {
          this.user.name = firebaseAuth.currentUser.displayName;
        }
      }
    },
  },
});
