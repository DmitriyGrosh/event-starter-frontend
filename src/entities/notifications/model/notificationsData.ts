import { create } from 'zustand';
import { NotificationsStore } from '../lib';
import { notificationsService } from '@/shared/api/notifications';

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: [],

  fetchData: async () => {
    try {
      const response = await notificationsService.getNotifications();
      set({ notifications: response });
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  },

  markAsRead: async (id: number) => {
    try {
      await notificationsService.markAsRead(id);
      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        ),
      }));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }
})); 