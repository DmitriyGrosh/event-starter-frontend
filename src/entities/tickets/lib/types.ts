import { UserTicket } from '@/shared/api/tickets/types';
import { TicketTransferRequest } from '@/shared/api/tickets/types';

export interface TicketsState {
  tickets: UserTicket[];
  isLoading: boolean;
  error: string | null;
  init: () => Promise<void>;
  transferTicket: (ticketId: number, transferData: TicketTransferRequest) => Promise<void>;
} 