<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { AuthService } from './auth';
import { TweetService } from './tweet';

export default defineComponent({
  name: 'App',
  data() {
    return {
      authService: inject<AuthService>('AuthService'),
      tweetService: inject<TweetService>('TweetService'),
    };
  },

  mounted() {
    this.$router.beforeEach(async (to, from) => {
      // make sure the user is authenticated
      if (
        !this.isAuthenticated &&
        // Avoid an infinite redirect
        to.name !== 'Login'
      ) {
        // redirect the user to the login page
        return { name: 'Login' };
      }
    });
  },

  unmounted() {
    //
  },

  computed: {
    isAuthenticated() {
      return this.authService?.authState.isAuthenticated;
    },
  },

  watch: {
    isAuthenticated: {
      handler(isLogined) {
        if (isLogined) {
          this.tweetService?.startWatch();
          this.$router.push('Home');
        } else {
          this.tweetService?.stopWatch();
          this.$router.push('Login');
        }
      },
      // force eager callback execution
      immediate: true,
    },
  },
});
</script>
