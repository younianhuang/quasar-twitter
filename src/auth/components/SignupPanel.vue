<template>
  <q-form @submit="signup">
    <q-input
      type="text"
      v-model="name"
      placeholder="name"
      lazy-rules
      outlined
      class="text-body1"
      :rules="[
        (val) => (val && val.length >= 4) || 'Please use minimum 4 characters',
      ]"
    />
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
        label="Signup"
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
  name: 'SignupPanel',
  data() {
    return {
      authService: inject<AuthService>('AuthService'),
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async signup() {
      try {
        await this.authService?.singup(this.email, this.password);
        await this.authService?.updateProfile({
          displayName: this.name,
        });
      } catch (err) {
        const error = err as Error;

        this.$q.dialog({
          title: 'Signup Failed',
          message: error.message,
        });
      }
    },
  },
  // computed: {

  // }
});
</script>
