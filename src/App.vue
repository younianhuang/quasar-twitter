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
    // this.authStore.init();
    this.authStore.$subscribe((mutation, state) => {
      if (!state.user.id) {
        this.$router.push('Login');
      }
    });
  },

  unmounted() {
    this.tweenStore.shutdown();
    //this.authStore.shutdown();
  },
});
</script>
