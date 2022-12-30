<template>
  <q-page>
    <div class="col q-gutter-md q-pa-md">
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
    <q-separator size="5px" spaced />
    <q-list>
      <q-item clickable>
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Nolan Huang</span>
            ><span class="text-grey-7"> @nolanhuang</span
            ><span class="text-grey-7">·2h</span></q-item-label
          >
          <q-item-label>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repellendus corrupti optio cupiditate reiciendis, natus, blanditiis
            nemo enim ipsum provident rerum excepturi qui similique quod
            doloremque debitis, eveniet aliquid quas laudantium!
          </q-item-label>
          <div class="row justify-around q-mt-sm">
            <q-btn flat round color="grey-7" icon="far fa-comment" size="sm" />
            <q-btn
              flat
              round
              color="grey-7"
              icon="fa-solid fa-retweet"
              size="sm"
            />
            <q-btn flat round color="grey-7" icon="far fa-heart" size="sm" />
            <q-btn
              flat
              round
              color="grey-7"
              icon="fa-solid fa-arrow-up-from-bracket"
              size="sm"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
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
