import { defineStore } from 'pinia';
import { Tweet } from 'src/tweet/Tweet';

export const useTweetStore = defineStore('tweet', {
  state: () => ({
    tweets: [] as Tweet[],
  }),
  getters: {},
  actions: {},
});
