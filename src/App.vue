<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTweetStore } from 'stores/TweetStore';
import { useAuthStore } from 'stores/AuthStore';

export default defineComponent({
  name: 'App',
  data() {
    return {
      tweenStore: useTweetStore(),
      authStore: useAuthStore(),
    };
  },

  mounted() {
    this.tweenStore.init();

    this.authStore.$subscribe((mutation, state) => {
      if (state.user.id) {
        this.$router.push('Home');
      } else {
        this.$router.push('Login');
      }
    });

    this.$router.beforeEach(async (to, from) => {
      // make sure the user is authenticated
      if (
        !this.authStore.isLogined &&
        // Avoid an infinite redirect
        to.name !== 'Login'
      ) {
        // redirect the user to the login page
        return { name: 'Login' };
      }
    });
  },

  unmounted() {
    this.tweenStore.shutdown();
  },
});
</script>
