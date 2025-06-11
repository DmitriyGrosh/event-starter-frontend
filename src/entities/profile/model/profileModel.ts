import { create } from 'zustand';
import { usersService } from '@/shared/api/users';
import { authService } from '@/shared/api/auth';
import { ProfileState } from '../lib';

export const useProfileStore = create<ProfileState>((set) => ({
  user: null,
  ownedEvents: [],
  subscribedEvents: [],
  isLoading: false,
  error: null,

  init: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Get user data
      const user = await authService.me();
      
      // Get user events
      const { ownedEvents, subscribedEvents } = await usersService.getMyEvents();
      
      set({ 
        user,
        ownedEvents, 
        subscribedEvents,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load profile data',
        isLoading: false 
      });
    }
  }
}));
