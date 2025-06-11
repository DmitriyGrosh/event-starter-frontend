import {Notification} from "@/shared/api/notifications";

export interface NotificationsStore {
  notifications: Notification[];
  fetchData: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
}
