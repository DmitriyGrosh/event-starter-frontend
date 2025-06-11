import { create } from 'zustand';
import { subscriptionService } from '@/shared/api/subscriptions';
import { SubscriptionState } from '../lib/types';

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscriptions: [],
  isLoading: false,
  error: null,

  init: async () => {
    try {
      set({ isLoading: true, error: null });
      const subscriptions = await subscriptionService.getUserSubscriptions();
      set({ subscriptions, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load subscriptions',
        isLoading: false 
      });
    }
  },

  subscribe: async (eventId: number) => {
    try {
      set({ isLoading: true, error: null });
      await subscriptionService.subscribe(eventId);
      // Refresh subscriptions after subscribing
      const subscriptions = await subscriptionService.getUserSubscriptions();
      set({ subscriptions, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to subscribe to event',
        isLoading: false 
      });
    }
  },

  unsubscribe: async (eventId: number) => {
    try {
      set({ isLoading: true, error: null });
      await subscriptionService.unsubscribe(eventId);
      // Refresh subscriptions after unsubscribing
      const subscriptions = await subscriptionService.getUserSubscriptions();
      set({ subscriptions, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to unsubscribe from event',
        isLoading: false 
      });
    }
  }
})); 