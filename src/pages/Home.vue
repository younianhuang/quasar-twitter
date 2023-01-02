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
      <transition-group
        appear
        enter-active-class="animated fadeIn slower"
        leave-active-class="animated fadeOut slower"
      >
        <q-item v-for="tweet in tweets" :key="tweet.id" clickable>
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
import { defineComponent } from 'vue';
import { formatDistance } from 'date-fns';
import { db } from 'src/boot/firebase';
import {
  collection,
  query,
  onSnapshot,
  Unsubscribe,
  orderBy,
  limit,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';

type Tweet = {
  id: string;
  content: string;
  date: number;
  like: boolean;
};

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      newTweetContent: '',
      tweets: new Array<Tweet>(),
      unsubscribe: <Unsubscribe | null>null,
    };
  },

  methods: {
    relativeDate(value: number): string {
      return formatDistance(value, new Date(), { addSuffix: true });
    },
    async addNewTweet(): Promise<void> {
      // Add a new document with a generated id..
      // const docRef = await addDoc(collection(db, 'tweets'), {
      await addDoc(collection(db, 'tweets'), {
        content: this.newTweetContent,
        date: Date.now(),
        like: false,
      });

      this.newTweetContent = '';
    },
    async deleteTweet(tweet: Tweet): Promise<void> {
      await deleteDoc(doc(db, 'tweets', tweet.id));
    },
    async toogleLike(tweet: Tweet): Promise<void> {
      const tweetRef = doc(db, 'tweets', tweet.id);

      await updateDoc(tweetRef, {
        like: !tweet.like,
      });
    },
  },
  mounted() {
    const q = query(collection(db, 'tweets'), orderBy('date'), limit(100));
    this.unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        const tweet = {
          id: change.doc.id,
          content: data.content,
          date: data.date,
          like: data.like,
        };

        if (change.type === 'added') {
          this.tweets.unshift(tweet);
        }
        if (change.type === 'modified') {
          const index = this.tweets.findIndex((t) => t.id === tweet.id);
          Object.assign(this.tweets[index], tweet);
        }
        if (change.type === 'removed') {
          const index = this.tweets.findIndex((t) => t.id === tweet.id);
          this.tweets.splice(index, 1);
        }
      });
    });
  },
  unmounted() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
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
