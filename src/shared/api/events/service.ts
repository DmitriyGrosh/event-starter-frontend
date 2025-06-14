import { EventsResponse, EventsQueryParams, Event, CreateEventRequest, CreateEventResponse, UpdateEventRequest, UpdateEventResponse } from './types';
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

  createEvent: async (formData: FormData): Promise<CreateEventResponse> => {
    const { data } = await api.post('/events/manage/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  updateEvent: async (id: string | number, formData: FormData): Promise<UpdateEventResponse> => {
    const { data } = await api.patch(`/events/manage/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  deleteEvent: async (id: string | number): Promise<void> => {
    await api.delete(`/events/manage/${id}`);
  },
}; 