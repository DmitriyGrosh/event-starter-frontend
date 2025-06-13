'use client';

import React from 'react';
import { TicketList } from '@/entities/tickets';
import { UserTicket } from '@/shared/api/tickets/types';
import { Alert } from 'antd';

interface TicketsTabProps {
  tickets: UserTicket[];
  onTransfer: (ticketId: number, values: { toUserId: number; quantity: number }) => Promise<void>;
}

export const TicketsTab: React.FC<TicketsTabProps> = ({ tickets, onTransfer }) => {
  if (tickets.length === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert
          message="Нет данных"
          description="У вас пока нет билетов"
          type="info"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <TicketList tickets={tickets} onTransfer={onTransfer} />
    </div>
  );
}; 