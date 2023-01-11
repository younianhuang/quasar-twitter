<template>
  <q-btn-dropdown
    color="yellow-10"
    :label="user.name.charAt(0)"
    rounded
    unelevated
    no-icon-animation
    dropdown-icon="more_horiz"
  >
    <div class="column items-center q-pa-lg">
      <q-btn
        :label="`Log out @${user.name}`"
        size="md"
        v-close-popup
        no-caps
        @click="logout"
      />
    </div>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { User } from 'src/stores/AuthStore';
import { AuthService } from '../domain/AuthService';

export default defineComponent({
  name: 'LogoutButton',
  data() {
    return {
      authService: inject<AuthService>('AuthService'),
    };
  },
  methods: {
    async logout() {
      await this.authService?.logout();
    },
  },
  computed: {
    user(): User {
      return this.authService?.authState.user as User;
    },
  },
});
</script>
