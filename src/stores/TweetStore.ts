import { defineStore } from 'pinia';
import { db } from 'src/boot/firebase';
import { useAuthStore } from 'stores/AuthStore';

export interface UserSnippet {
  id: string;
  name: string;
  photoURL: string;
}

export interface Tweet {
  id: string;
  content: string;
  date: number;
  like: boolean;
  userSnippet: UserSnippet;
}

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
  where,
  doc,
} from 'firebase/firestore';

export const useTweetStore = defineStore('tweet', {
  state: () => ({
    tweets: [] as Tweet[],
    unsubscribe: <Unsubscribe | null>null,
  }),
  getters: {},
  actions: {
    async addTweet(content: string): Promise<void> {
      const auth = useAuthStore();

      // Add a new document with a generated id..
      await addDoc(collection(db, 'tweets'), {
        content: content,
        date: Date.now(),
        userSnippet: {
          id: auth.user.id,
          name: auth.user.name,
          photoURL: '',
        },
      });
    },

    async deleteTweet(id: string): Promise<void> {
      await deleteDoc(doc(db, 'tweets', id));
    },

    async updateTweet(id: string, data: Partial<Tweet>): Promise<void> {
      const tweetRef = doc(db, 'tweets', id);

      await updateDoc(tweetRef, data);
    },

    onSnapshotLatestTweets(queryLimit = 100): Unsubscribe {
      const q = query(
        collection(db, 'tweets'),
        // where('userSnippet.id', '==', id),
        orderBy('date'),
        limit(queryLimit)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const data = change.doc.data();

          const tweet = {
            id: change.doc.id,
            content: data.content,
            date: data.date,
            like: data.like,
            userSnippet: data.userSnippet
              ? {
                  id: data.userSnippet.id,
                  name: data.userSnippet.name,
                  photoURL: data.userSnippet.photoURL,
                }
              : undefined,
          };

          if (change.type === 'added') {
            this.tweets.unshift(tweet);
          } else if (change.type === 'modified') {
            const index = this.tweets.findIndex((t) => t.id === tweet.id);
            Object.assign(this.tweets[index], tweet);
          } else if (change.type === 'removed') {
            const index = this.tweets.findIndex((t) => t.id === tweet.id);
            this.tweets.splice(index, 1);
          }
        });
      });

      return unsubscribe;
    },

    // init() {
    //   const q = query(collection(db, 'tweets'), orderBy('date'), limit(100));

    //   this.unsubscribe = onSnapshot(q, (snapshot) => {
    //     snapshot.docChanges().forEach((change) => {
    //       const data = change.doc.data();
    //       const tweet = {
    //         id: change.doc.id,
    //         content: data.content,
    //         date: data.date,
    //         like: data.like,
    //       };

    //       if (change.type === 'added') {
    //         this.tweets.unshift(tweet);
    //       } else if (change.type === 'modified') {
    //         const index = this.tweets.findIndex((t) => t.id === tweet.id);
    //         Object.assign(this.tweets[index], tweet);
    //       } else if (change.type === 'removed') {
    //         const index = this.tweets.findIndex((t) => t.id === tweet.id);
    //         this.tweets.splice(index, 1);
    //       }
    //     });
    //   });
    // },

    // shutdown() {
    //   if (this.unsubscribe) {
    //     this.unsubscribe();
    //   }
    // },
  },
});
