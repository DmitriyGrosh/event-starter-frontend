import { EventsResponse, EventsQueryParams } from './types';
import { api } from '../api';

export const eventService = {
  getEvents: async (params: EventsQueryParams = {}): Promise<EventsResponse> => {
    const { data } = await api.get('/events/', { params });
    return data;
  },
}; 