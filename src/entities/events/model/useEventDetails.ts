import { create } from 'zustand';
import { useParams } from 'next/navigation';
import { eventService } from '@/shared/api/events/service';
import { Event } from '@/shared/api/events/types';
import React from 'react';

interface EventDetailsState {
  eventDetails: Event | null;
  isLoading: boolean;
  error: string | null;
  init: (eventId: string) => Promise<void>;
}

export const useEventDetailsStore = create<EventDetailsState>((set) => ({
  eventDetails: null,
  isLoading: false,
  error: null,

  init: async (eventId: string) => {
    try {
      set({ isLoading: true, error: null });
      const data = await eventService.getEventById(eventId);
      set({ eventDetails: data, isLoading: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных мероприятия',
        isLoading: false 
      });
    }
  }
}));

export const useEventDetails = () => {
  const params = useParams();
  const { eventDetails, isLoading, error, init } = useEventDetailsStore();
  const eventId = params?.id as string;

  React.useEffect(() => {
    if (eventId) {
      init(eventId);
    }
  }, [eventId, init]);

  const refetch = React.useCallback(async () => {
    if (eventId) {
      await init(eventId);
    }
  }, [eventId, init]);

  return {
    eventDetails,
    isLoading,
    error,
    refetch
  };
}; 