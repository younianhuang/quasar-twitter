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

// const this.firebaseAuth = getAuth();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // auth: new Auth(),
    user: new User(),
    firebaseAuth: getAuth(),
  }),
  getters: {
    isAuthenticated(): boolean {
      return this.user.id !== '';
    },
  },
  actions: {
    async login(email: string, password: string): Promise<void> {
      const userCredential = await signInWithEmailAndPassword(
        this.firebaseAuth,
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
      await signOut(this.firebaseAuth);
      this.user = new User();
      this.user.online = false;
    },

    async singup(email: string, password: string): Promise<void> {
      const userCredential = await createUserWithEmailAndPassword(
        this.firebaseAuth,
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
      if (this.firebaseAuth.currentUser) {
        await updateProfile(this.firebaseAuth.currentUser, {
          displayName: displayName,
          photoURL: photoURL,
        });

        if (this.firebaseAuth.currentUser.displayName) {
          this.user.name = this.firebaseAuth.currentUser.displayName;
        }
      }
    },
  },
});
