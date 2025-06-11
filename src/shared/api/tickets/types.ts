interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  ownerId: number;
}

export interface Ticket {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  eventId: number;
  event?: Event;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserTicket {
  id: number;
  quantity: number;
  totalPaid: number;
  status: string;
  createdAt: string;
  ticket: Ticket;
  user: User;
}

export interface TicketAvailability {
  ticket: Ticket;
  totalQuantity: number;
  soldCount: number;
  availableCount: number;
}

export interface TicketTransferRequest {
  toUserId: number;
  quantity: number;
}

interface TicketPurchase {
  id: number;
  quantity: number;
  status: string;
  user: User;
  ticket?: Ticket;
}

export interface TicketTransferResponse {
  id: number;
  quantity: number;
  status: string;
  createdAt: string;
  fromPurchase: TicketPurchase;
  toPurchase: TicketPurchase;
}

export type UserTicketsResponse = UserTicket[]; 