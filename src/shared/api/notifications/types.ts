export type NotificationType = 'event' | 'system' | 'reminder';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  metadata: Record<string, any>;
  read: boolean;
  createdAt: string;
}

export type NotificationsResponse = Notification[];

export interface PollNotificationsResponse {
  notifications: Notification[];
  lastNotificationId: number;
}
