import { create } from 'zustand';
import { Notification, NotificationType } from './types';
import { getIconByType } from '../lib/getIconByType';

interface NotificationsStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'icon'>) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  removeNotification: (id: number) => void;
}

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: [
    {
      id: 1,
      type: 'event',
      title: 'Новое мероприятие',
      description: 'Завтра состоится встреча команды',
      time: '2 часа назад',
      read: false,
      icon: getIconByType('event'),
    },
    {
      id: 2,
      type: 'system',
      title: 'Обновление профиля',
      description: 'Ваш профиль был успешно обновлен',
      time: '5 часов назад',
      read: true,
      icon: getIconByType('system'),
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Напоминание',
      description: 'Не забудьте подготовиться к завтрашней презентации',
      time: '1 день назад',
      read: true,
      icon: getIconByType('reminder'),
    },
  ],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          id: Date.now(),
          read: false,
          icon: getIconByType(notification.type),
          ...notification,
        },
        ...state.notifications,
      ],
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    })),
})); 