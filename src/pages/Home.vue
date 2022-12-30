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
        v-model="newTweetContent"
        placeholder="What's happening?"
        counter
        autogrow
        maxlength="280"
        class="q-pl-xl input"
        style="line-height: 20px"
      >
        <template v-slot:append>
          <q-icon
            v-if="newTweetContent !== ''"
            name="close"
            @click="newTweetContent = ''"
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
          :disable="!newTweetContent"
          @click="addNewTweet"
        />
      </div>
    </div>
    <q-separator size="5px" spaced />
    <q-list separator>
      <q-item v-for="tweet in tweets" :key="tweet.date" clickable>
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <span class="text-weight-bold">Nolan Huang</span>
            ><span class="text-grey-7"> @nolanhuang</span
            ><span class="text-grey-7">
              · {{ relativeDate(tweet.date) }}</span
            ></q-item-label
          >
          <q-item-label>
            <p class="tweet-content">{{ tweet.content }}</p>
          </q-item-label>
          <div class="row justify-between q-mt-sm tweet-button">
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
            <q-btn
              flat
              round
              color="grey-7"
              icon="fa-regular fa-trash-can"
              size="sm"
              @click="deleteTweet(tweet)"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { formatDistance } from 'date-fns';

type Tweet = {
  content: string;
  date: number;
};

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      newTweetContent: '',
      tweets: new Array<Tweet>(),
    };
  },

  methods: {
    relativeDate(value: number): string {
      return formatDistance(value, new Date());
    },
    addNewTweet(): void {
      this.tweets.unshift({
        content: this.newTweetContent,
        date: Date.now(),
      });

      this.newTweetContent = '';
    },
    deleteTweet(tweet: Tweet): void {
      const index = this.tweets.findIndex((t) => t.date === tweet.date);
      this.tweets.splice(index, 1);
    },
  },
});
</script>

<style lang="scss">
.input textarea {
  font-size: 20px;
  line-height: 1.5 !important;
}

.tweet-button {
  margin-left: -6px;
  margin-right: 50px;
}

.tweet-content {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
