<template>
  <q-page>
    <div class="col q-gutter-md q-pa-md">
      <div>
        <q-avatar>
          <!-- <img src="https://cdn.quasar.dev/img/avatar5.jpg" /> -->
          <q-btn
            dense
            color="orange"
            round
            :label="user.name.charAt(0).toLocaleUpperCase()"
            class=""
          >
          </q-btn>
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
          @click="createNewTweet"
        />
      </div>
    </div>
    <q-separator size="5px" spaced />

    <q-list separator>
      <transition-group
        appear
        enter-active-class="animated fadeIn slower"
        leave-active-class="animated fadeOut slower"
      >
        <q-item v-for="tweet in tweets" :key="tweet.id" clickable>
          <q-item-section avatar top>
            <q-avatar>
              <!-- <img src="https://cdn.quasar.dev/img/avatar2.jpg" /> -->
              <q-badge
                rounded
                color="orange"
                :label="tweet.userSnippet.name.charAt(0).toLocaleUpperCase()"
                class="text-body2"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <span class="text-weight-bold">
                {{ tweet.userSnippet.name }}</span
              >
              <span class="text-grey-7"> @{{ tweet.userSnippet.name }}</span>
              <span class="text-grey-7">
                · {{ relativeDate(tweet.date) }}</span
              ></q-item-label
            >
            <q-item-label>
              <p class="tweet-content">{{ tweet.content }}</p>
            </q-item-label>
            <div class="row justify-between q-mt-sm tweet-button">
              <q-btn
                flat
                round
                color="grey-7"
                icon="far fa-comment"
                size="sm"
              />
              <q-btn
                flat
                round
                color="grey-7"
                icon="fa-solid fa-retweet"
                size="sm"
              />
              <q-btn
                flat
                round
                :color="tweet.like ? 'red' : 'grey-7'"
                :icon="tweet.like ? 'fa-solid fa-heart' : 'far fa-heart'"
                size="sm"
                @click="toogleLike(tweet)"
              />
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
                :disable="user.id !== tweet.userSnippet.id"
                @click="deleteTweet(tweet)"
              />
            </div>
          </q-item-section>
        </q-item>
      </transition-group>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { formatDistance } from 'date-fns';
import { User } from 'stores/AuthStore';
import { Tweet, TweetService } from '../tweet';
import { AuthService } from '../auth';

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      newTweetContent: '',
      tweetService: inject<TweetService>('TweetService'),
      authService: inject<AuthService>('AuthService'),
    };
  },
  mounted() {
    //
  },
  unmounted() {
    //
  },

  methods: {
    relativeDate(value: number): string {
      return formatDistance(value, new Date(), { addSuffix: true });
    },
    async createNewTweet(): Promise<void> {
      await this.tweetService?.createNewTweet(this.newTweetContent);
      this.newTweetContent = '';
    },
    async deleteTweet(tweet: Tweet): Promise<void> {
      this.$q
        .dialog({
          title: 'Delete Tweet?',
          message:
            'This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results. ',
          cancel: {
            rounded: true,
            color: 'white',
            'text-color': 'black',
            padding: '10px 50px',
          },
          ok: {
            label: 'Delete',
            rounded: true,
            color: 'red',
            padding: '10px 50px',
          },
          stackButtons: true,
        })
        .onOk(() => {
          this.tweetService?.deleteTweet(tweet.id).then(() => {
            this.$q.notify({
              message: 'Tweet deleted.',
              color: 'secondary',
              timeout: 2000,
            });
          });
        });
    },
    async toogleLike(tweet: Tweet): Promise<void> {
      await this.tweetService?.updateTweet(tweet.id, { like: !tweet.like });
    },
  },

  computed: {
    tweets(): Tweet[] {
      return this.tweetService?.tweetState.tweets as Tweet[];
    },

    user(): User {
      return this.authService?.authState.user as User;
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
