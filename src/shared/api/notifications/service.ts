import { api } from '../api';
import { Notification, NotificationsResponse, PollNotificationsResponse } from './types';

export const notificationsService = {
  getNotifications: async (): Promise<NotificationsResponse> => {
    const { data } = await api.get<NotificationsResponse>('/notifications/');
    return data;
  },

  pollNotifications: async (lastNotificationId: number): Promise<PollNotificationsResponse> => {
    const { data } = await api.get<PollNotificationsResponse>('/notifications/poll', {
      params: { lastNotificationId }
    });
    return data;
  },

  markAsRead: async (id: number): Promise<Notification> => {
    const { data } = await api.patch<Notification>(`/notifications/${id}/read`);
    return data;
  }
}; 