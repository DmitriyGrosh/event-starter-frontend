export interface UserEvent {
  id: number;
  title: string;
	imageUrl: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  ownerId: number;
  createdAt: string;
}

export interface UserEventsResponse {
  ownedEvents: UserEvent[];
  subscribedEvents: UserEvent[];
} 