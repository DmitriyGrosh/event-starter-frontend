import { create } from 'zustand';
import { ticketsService } from '@/shared/api/tickets';
import { TicketsState } from '../lib/types';
import { TicketTransferRequest } from '@/shared/api/tickets/types';

export const useTicketsStore = create<TicketsState>((set) => ({
  tickets: [],
  isLoading: false,
  error: null,

  init: async () => {
    try {
      set({ isLoading: true, error: null });
      const tickets = await ticketsService.getMyTickets();
      set({ tickets, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load tickets',
        isLoading: false 
      });
    }
  },

  transferTicket: async (ticketId: number, transferData: TicketTransferRequest) => {
    try {
      set({ isLoading: true, error: null });
      await ticketsService.transferTicket(ticketId, transferData);
      // Refresh tickets after transfer
      const tickets = await ticketsService.getMyTickets();
      set({ tickets, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to transfer ticket',
        isLoading: false 
      });
    }
  }
})); 