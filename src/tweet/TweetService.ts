/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tweet } from './Tweet';
import { TweetRepository, EventType, Unsubscribe } from './TweetRepository';

export class TweetService {
  private tweetRepository: TweetRepository;
  private tweetStore: any;
  private authStore: any;
  private unsubscribe: Unsubscribe | null = null;

  constructor(
    tweetRepository: TweetRepository,
    tweetStore: any,
    authStore: any
  ) {
    this.tweetRepository = tweetRepository;
    this.tweetStore = tweetStore;
    this.authStore = authStore;
  }

  public async createNewTweet(content: string): Promise<void> {
    const user = this.authStore.user;

    this.tweetRepository.addTweet({
      id: '',
      content: content,
      date: Date.now(),
      like: false,
      userSnippet: {
        id: user.id,
        name: user.name,
        photoURL: '',
      },
    });
  }

  public async deleteTweet(id: string): Promise<void> {
    await this.tweetRepository.deleteTweet(id);
  }

  public async updateTweet(id: string, data: Partial<Tweet>): Promise<void> {
    await this.tweetRepository.updateTweet(id, data);
  }

  public get TweetStore(): any {
    return this.tweetStore;
  }

  /**
   * Start watch the repository change and store the latest snapshot in tweetStore
   */
  public startWatch() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.tweetRepository.subscribe((event) => {
        const tweets = this.tweetStore.tweets as Array<Tweet>;
        const tweet = event.data;
        switch (event.type) {
          case EventType.Added:
            tweets.unshift(tweet);
            break;
          case EventType.Removed:
            {
              const index = tweets.findIndex((t) => t.id === tweet.id);
              tweets.splice(index, 1);
            }
            break;
          case EventType.Modified:
            {
              const index = tweets.findIndex((t) => t.id === tweet.id);
              Object.assign(tweets[index], tweet);
            }
            break;

          default:
            break;
        }
      });
    }
  }

  /**
   * Stop watch the repository change
   */
  public stopWatch() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
