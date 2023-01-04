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
    console.log('App init');
    this.tweenStore.init();
    this.authStore.init();
  },

  unmounted() {
    console.log('App shutdown');
    this.tweenStore.shutdown();
    this.authStore.shutdown();
  },
});
</script>
