'use client';

import React from 'react';
import { Typography, Flex, Card, Alert } from 'antd';
import { CardEvent } from '@/entities/events';
import { UserEvent } from '@/shared/api/users/types';

const { Text } = Typography;

interface EventsTabProps {
  events: UserEvent[];
  emptyText: string;
}

export const EventsTab: React.FC<EventsTabProps> = ({ events, emptyText }) => {
  const renderEventCard = (event: UserEvent) => (
    <CardEvent
      key={event.id}
      id={event.id.toString()}
      title={event.title}
      location="Location not available"
      price={0}
      description={event.description}
      imageUrl={event.imageUrl ?? undefined}
    />
  );

  return (
    <div style={{ padding: '20px' }}>
      {events.length === 0 ? (
        <Alert
          message="Нет данных"
          description={emptyText}
          type="info"
          showIcon
        />
      ) : (
        <Card>
          <Flex vertical gap={8}>
            {events.map(renderEventCard)}
          </Flex>
        </Card>
      )}
    </div>
  );
}; 