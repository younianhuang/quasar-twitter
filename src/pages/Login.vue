<template>
  <q-page class="row justify-center">
    <div class="q-pa-md" style="width: 400px">
      <q-form @submit="onSubmit" class="q-gutter-sm">
        <q-input
          type="email"
          v-model="email"
          placeholder="email"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please correct email format',
          ]"
        />

        <q-input
          type="password"
          v-model="password"
          placeholder="password"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 6) ||
              'Password must longer than 6 character',
          ]"
        />
        <div>
          <q-btn label="Login" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from 'stores/AuthStore';

export default defineComponent({
  name: 'LoginPage',
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

        if (this.authStore.user.id) {
          this.$router.push('Home');
        }
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
    if (this.authStore.user.id) {
      this.$router.push('Home');
    }
  },
  unmounted() {
    //
  },
});
</script>

<style lang="scss"></style>
