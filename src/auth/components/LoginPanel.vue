<template>
  <q-form @submit="login">
    <q-input
      type="email"
      v-model="email"
      placeholder="email"
      lazy-rules
      outlined
      class="text-body1"
      :rules="[
        (val) =>
          (val && val.length > 0) || 'Please enter a valid email address',
      ]"
    />
    <q-input
      type="password"
      v-model="password"
      placeholder="password"
      outlined
      class="text-body1"
      lazy-rules
      :rules="[
        (val) => (val && val.length >= 6) || 'Please use minimum 6 characters',
      ]"
    />
    <div>
      <q-btn
        unelevated
        rounded
        label="Login"
        type="submit"
        color="primary"
        class="q-px-xl"
      />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { AuthService } from '../domain/AuthService';

export default defineComponent({
  name: 'LoginPanel',
  data() {
    return {
      authService: inject<AuthService>('AuthService'),
      email: 'guest@gmail.com',
      password: 'guest1234',
    };
  },
  methods: {
    async login() {
      try {
        await this.authService?.login(this.email, this.password);
      } catch (err) {
        const error = err as Error;

        this.$q.dialog({
          title: 'Login Failed',
          message: error.message,
        });
      }
    },
  },
  // computed: {

  // }
});
</script>
