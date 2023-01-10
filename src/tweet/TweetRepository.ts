import { Tweet } from './Tweet';

export enum EventType {
  Added,
  Removed,
  Modified,
}

export class EventData {
  type: EventType;
  data: Tweet;

  constructor(type: EventType, data: Tweet) {
    this.type = type;
    this.data = data;
  }
}

/**
 * Callback of a subscription
 */
export declare type SubscriptionCallback = (eventData: EventData) => void;

export declare interface Unsubscribe {
  /** Removes the listener when invoked. */
  (): void;
}

export interface TweetRepository {
  addTweet(tweet: Tweet): Promise<void>;

  deleteTweet(id: string): Promise<void>;

  updateTweet(id: string, data: Partial<Tweet>): Promise<void>;

  subscribe(callback: SubscriptionCallback): Unsubscribe;
}
