export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  price: number;
  ownerId: number;
}

export interface EventsResponse {
  events: Event[];
  total: number;
  page: number;
  limit: number;
}

export interface EventsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  dateStart?: string;
  dateEnd?: string;
} 