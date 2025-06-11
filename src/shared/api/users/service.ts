import { api } from '../api';
import { UserEventsResponse } from './types';

export const usersService = {
  getMyEvents: async (): Promise<UserEventsResponse> => {
    const { data } = await api.get<UserEventsResponse>('/users/me/events');
    return data;
  }
}; 