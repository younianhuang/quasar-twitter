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
        v-model="newContent"
        placeholder="What's happening?"
        counter
        autogrow
        maxlength="280"
        class="q-pl-xl input"
        style="line-height: 20px"
      >
        <template v-slot:append>
          <q-icon
            v-if="newContent !== ''"
            name="close"
            @click="newContent = ''"
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
          :disable="!newContent"
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
      newContent: '',
    };
  },
});
</script>

<style lang="scss">
.input textarea {
  font-size: 20px;
  line-height: 1.5 !important;
}
</style>
