import { api } from '../api';
import { 
  UserTicketsResponse, 
  TicketAvailability, 
  TicketTransferRequest,
  TicketTransferResponse 
} from './types';

export const ticketsService = {
  getMyTickets: async (): Promise<UserTicketsResponse> => {
    const { data } = await api.get<UserTicketsResponse>('/tickets/my-tickets');
    return data;
  },

  getTicketAvailability: async (ticketId: number): Promise<TicketAvailability> => {
    const { data } = await api.get<TicketAvailability>(`/tickets/availability/${ticketId}`);
    return data;
  },

  transferTicket: async (
    ticketId: number, 
    transferData: TicketTransferRequest
  ): Promise<TicketTransferResponse> => {
    const { data } = await api.post<TicketTransferResponse>(
      `/tickets/transfer/${ticketId}`,
      transferData
    );
    return data;
  }
}; 