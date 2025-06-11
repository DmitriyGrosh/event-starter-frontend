import { Event } from '../events/types';
import { User } from '../auth/types';

export interface Subscription {
  userId: number;
  eventId: number;
  createdAt: string;
  event: Event;
  user: User;
}

export interface SubscriptionResponse extends Subscription {}

export interface SubscriptionError {
  message: string;
  statusCode: number;
}

export interface EventSubscriber {
  user: User;
  createdAt: string;
}

export type EventSubscribersResponse = EventSubscriber[];

export interface UserSubscription {
  event: Event;
  createdAt: string;
}

export type UserSubscriptionsResponse = UserSubscription[]; 