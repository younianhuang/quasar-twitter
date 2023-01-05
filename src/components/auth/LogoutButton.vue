<template>
  <q-btn-dropdown
    color="yellow-10"
    :label="authStore.user.name.charAt(0)"
    rounded
    unelevated
    no-icon-animation
    dropdown-icon="more_horiz"
  >
    <div class="column items-center q-pa-lg">
      <q-btn
        :label="`Log out @${authStore.user.name}`"
        size="md"
        v-close-popup
        no-caps
        @click="authStore.logout"
      />
    </div>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from 'stores/AuthStore';

export default defineComponent({
  name: 'LogoutButton',
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
  // methods: {

  // },
  // computed: {

  // }
});
</script>
