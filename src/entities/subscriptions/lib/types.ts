import { Subscription } from '@/shared/api/subscriptions/types';

export interface SubscriptionState {
  subscriptions: Subscription[];
  isLoading: boolean;
  error: string | null;
  init: () => Promise<void>;
  subscribe: (eventId: number) => Promise<void>;
  unsubscribe: (eventId: number) => Promise<void>;
} 