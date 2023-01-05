<template>
  <q-page class="row justify-center">
    <div class="q-pa-md" style="width: 400px">
      <q-form @submit="onSubmit">
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
            (val) =>
              (val && val.length > 6) || 'Please use minimum 6 characters',
          ]"
        />
        <div>
          <q-btn
            unelevated
            rounded
            label="Login"
            type="submit"
            color="primary"
          />
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
