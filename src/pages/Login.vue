<template>
  <q-page class="row justify-center">
    <login-panel></login-panel>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from 'stores/AuthStore';
import LoginPanel from 'src/components/auth/LoginTabPanel.vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginPanel,
  },
  data() {
    return {
      authStore: useAuthStore(),
      email: 'guest@gamil.com',
      password: 'guest1234',
    };
  },

  methods: {
    async onSubmit() {
      try {
        await this.authStore.login(this.email, this.password);
      } catch (err) {
        const error = err as Error;

        this.$q.dialog({
          title: 'Login Failed',
          message: error.message,
        });
      }
    },
  },
  mounted() {
    //
  },
  unmounted() {
    //
  },
});
</script>

<style lang="scss"></style>
