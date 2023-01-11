import { defineStore } from 'pinia';
import { Tweet } from 'src/tweet/domain/Tweet';

export interface TweetState {
  tweets: Tweet[];
}

export const useTweetStore = defineStore('tweet', {
  state: (): TweetState => ({
    tweets: [] as Tweet[],
  }),
  getters: {},
  actions: {},
});
