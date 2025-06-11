import { UserSubscription } from '@/shared/api/subscriptions/types';

export interface SubscriptionState {
  subscriptions: UserSubscription[];
  isLoading: boolean;
  error: string | null;
  init: () => Promise<void>;
  subscribe: (eventId: number) => Promise<void>;
  unsubscribe: (eventId: number) => Promise<void>;
} 