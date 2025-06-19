export type Ticket = {
	id: number;
	name: string;
	price: number;
	quantity: number;
	eventId: number;
	createdAt: string;
	description: string;
}

export interface Event {
  id: number;
  title: string;
	price: number;
  location: string;
  dateStart: string;
  dateEnd: string;
  ownerId: number;
  createdAt: string;
	imageUrl: string;
  owner: {
    id: number;
    name: string;
    email: string;
  };
  tickets: Ticket[];
	tags: string[]
  description: string;
  _count: {
    subscribers: number;
  };
}

export interface EventsResponse {
  events: Event[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

export interface EventsQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
  fromDate?: string;
  toDate?: string;
  tags?: string[];
  minPrice?: number;
  maxPrice?: number;
  location?: string;
}

// New types for create event service
export interface CreateEventRequest {
  title: string;
  description: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  tickets: {
    name: string;
    description: string;
    price: number;
    quantity: number;
  }[];
}

export interface CreateEventResponse {
  id: number;
  title: string;
  description: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  ownerId: number;
  createdAt: string;
  owner: {
    id: number;
    name: string;
    email: string;
  };
  tickets: {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    eventId: number;
    createdAt: string;
  }[];
  _count: {
    subscribers: number;
  };
}

// New types for update event service
export interface UpdateEventRequest {
  title: string;
  description: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  tickets: {
    name: string;
    description: string;
    price: number;
    quantity: number;
  }[];
}

export interface UpdateEventResponse {
  id: number;
  title: string;
  description: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  ownerId: number;
  createdAt: string;
  owner: {
    id: number;
    name: string;
    email: string;
  };
  tickets: {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    eventId: number;
    createdAt: string;
  }[];
  _count: {
    subscribers: number;
  };
} 
