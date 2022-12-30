<template>
  <q-page class="q-pa-md">
    <div class="col q-gutter-md">
      <div>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
        </q-avatar>
      </div>

      <q-input
        bottom-slots
        v-model="newTwitterText"
        placeholder="What's happening?"
        counter
        autogrow
        maxlength="240"
        class="q-pl-xl"
      >
        <template v-slot:append>
          <q-icon
            v-if="newTwitterText !== ''"
            name="close"
            @click="newTwitterText = ''"
            class="cursor-pointer"
          />
        </template>
      </q-input>
      <div class="row">
        <q-space /><q-btn
          unelevated
          rounded
          no-caps
          color="primary"
          label="Tweet"
          :disable="!newTwitterText"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      newTwitterText: '',
    };
  },
});
</script>
