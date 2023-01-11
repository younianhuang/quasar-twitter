import { Tweet } from '../domain/Tweet';

import {
  EventType,
  EventData,
  TweetRepository,
  SubscriptionCallback,
  Unsubscribe,
} from '../domain/TweetRepository';

import {
  Firestore,
  query,
  onSnapshot,
  orderBy,
  collection,
  limit,
  addDoc,
  deleteDoc,
  updateDoc,
  // where,
  doc,
} from 'firebase/firestore';

export class FirebaseTweetRepository implements TweetRepository {
  db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async addTweet(tweet: Tweet): Promise<void> {
    // Add a new document with a generated id..
    await addDoc(collection(this.db, 'tweets'), {
      content: tweet.content,
      date: tweet.date,
      like: tweet.like,
      userSnippet: tweet.userSnippet,
    });
  }

  async deleteTweet(id: string): Promise<void> {
    await deleteDoc(doc(this.db, 'tweets', id));
  }

  async updateTweet(id: string, data: Partial<Tweet>): Promise<void> {
    const tweetRef = doc(this.db, 'tweets', id);
    await updateDoc(tweetRef, data);
  }

  subscribe(callback: SubscriptionCallback): Unsubscribe {
    const q = query(
      collection(this.db, 'tweets'),
      // where('userSnippet.id', '==', id),
      orderBy('date'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        const tweet = {
          id: change.doc.id,
          content: data.content,
          date: data.date,
          like: data.like,
          userSnippet: {
            id: data.userSnippet.id,
            name: data.userSnippet.name,
            photoURL: data.userSnippet.photoURL,
          },
        };

        let type = EventType.Added;
        if (change.type === 'modified') {
          type = EventType.Modified;
        } else if (change.type === 'removed') {
          type = EventType.Removed;
        }
        callback(new EventData(type, tweet));
      });
    });

    return unsubscribe;
  }
}
