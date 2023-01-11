<template>
  <div class="q-pa-md" style="width: 400px">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" no-caps />
        <q-tab name="signup" label="Signup" no-caps />
      </q-tabs>

      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <login-panel></login-panel>
        </q-tab-panel>

        <q-tab-panel name="signup">
          <signup-panel></signup-panel>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginPanel from './LoginPanel.vue';
import SignupPanel from './SignupPanel.vue';

export default defineComponent({
  name: 'LoginTabPanel',
  components: {
    LoginPanel,
    SignupPanel,
  },
  data() {
    return {
      tab: 'login',
    };
  },
  // methods: {
  // },
  // computed: {

  // }
});
</script>
