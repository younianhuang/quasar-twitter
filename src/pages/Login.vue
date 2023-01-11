<template>
  <q-page class="row justify-center">
    <login-panel></login-panel>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginPanel from 'src/auth/components/LoginTabPanel.vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginPanel,
  },
  data() {
    return {};
  },

  methods: {
    //
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
