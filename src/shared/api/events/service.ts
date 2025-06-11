import { EventsResponse, EventsQueryParams, Event } from './types';
import { api } from '../api';

export const eventService = {
  getEvents: async (params: EventsQueryParams = {}): Promise<EventsResponse> => {
    const { data } = await api.get('/events/', { params });
    return data;
  },

  getEventById: async (id: string | number): Promise<Event> => {
    const { data } = await api.get(`/events/${id}`);
    return data;
  },
}; 