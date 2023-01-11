/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tweet } from './Tweet';
import { TweetRepository, EventType, Unsubscribe } from './TweetRepository';
import { TweetState } from 'src/stores/TweetStore';

export class TweetService {
  private _tweetRepository: TweetRepository;
  private _tweetState: TweetState;
  private _authStore: any;
  private _unsubscribe: Unsubscribe | null = null;

  constructor(
    tweetRepository: TweetRepository,
    tweetState: TweetState,
    authStore: any
  ) {
    this._tweetRepository = tweetRepository;
    this._tweetState = tweetState;
    this._authStore = authStore;
  }

  public async createNewTweet(content: string): Promise<void> {
    const user = this._authStore.user;

    this._tweetRepository.addTweet({
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
    await this._tweetRepository.deleteTweet(id);
  }

  public async updateTweet(id: string, data: Partial<Tweet>): Promise<void> {
    await this._tweetRepository.updateTweet(id, data);
  }

  public get tweetState(): TweetState {
    return this._tweetState;
  }

  /**
   * Start watch the repository change and store the latest snapshot in tweetStore
   */
  public startWatch() {
    if (!this._unsubscribe) {
      this._unsubscribe = this._tweetRepository.subscribe((event) => {
        const tweets = this._tweetState.tweets as Array<Tweet>;
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
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
}
