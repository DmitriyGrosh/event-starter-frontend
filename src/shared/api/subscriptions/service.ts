import { api } from '../api';
import { SubscriptionResponse, SubscriptionError, EventSubscribersResponse, UserSubscriptionsResponse } from './types';

export const subscriptionService = {
  subscribe: async (eventId: number): Promise<SubscriptionResponse> => {
    try {
      const { data } = await api.post<SubscriptionResponse>(`/subscriptions/${eventId}`);
      return data;
    } catch (error) {
      const subscriptionError = error as SubscriptionError;
      throw new Error(subscriptionError.message || 'Failed to subscribe to event');
    }
  },

  unsubscribe: async (eventId: number): Promise<void> => {
    try {
      await api.delete(`/subscriptions/${eventId}`);
    } catch (error) {
      const subscriptionError = error as SubscriptionError;
      throw new Error(subscriptionError.message || 'Failed to unsubscribe from event');
    }
  },

  getEventSubscribers: async (eventId: number): Promise<EventSubscribersResponse> => {
    try {
      const { data } = await api.get<EventSubscribersResponse>(`/subscriptions/event/${eventId}/subscribers`);
      return data;
    } catch (error) {
      const subscriptionError = error as SubscriptionError;
      throw new Error(subscriptionError.message || 'Failed to get event subscribers');
    }
  },

  getUserSubscriptions: async (): Promise<UserSubscriptionsResponse> => {
    try {
      const { data } = await api.get<UserSubscriptionsResponse>('/subscriptions/user/subscriptions');
      return data;
    } catch (error) {
      const subscriptionError = error as SubscriptionError;
      throw new Error(subscriptionError.message || 'Failed to get user subscriptions');
    }
  }
}; 