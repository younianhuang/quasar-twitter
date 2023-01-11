import { defineStore } from 'pinia';

export class User {
  id = '';
  name = '';
  email = '';
  online = false;
}

export interface AuthState {
  user: User;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: new User(),
  }),
  getters: {
    isAuthenticated(): boolean {
      return this.user.id !== '';
    },
  },
  actions: {},
});
