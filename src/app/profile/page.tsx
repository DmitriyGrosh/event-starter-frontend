'use client';

import React, { useEffect } from 'react';
import { Card, Typography, Avatar, Space, Tabs, Flex, Statistic, Row, Col, Spin } from 'antd';
import { UserOutlined, CalendarOutlined, TeamOutlined, TagOutlined } from '@ant-design/icons';
import { useAuth } from "@/entities/viewer";
import { useProfileStore } from '@/entities/profile/model/profileModel';
import { useTicketsStore } from '@/entities/tickets/model';
import { AboutTab, EventsTab, TicketsTab } from '@/entities/profile/ui/tabs';

const { Title, Text } = Typography;

export default function ProfilePage() {
  const { isAuthenticated } = useAuth();
  const { user, ownedEvents, subscribedEvents, isLoading: isProfileLoading, error: profileError, init: initProfile } = useProfileStore();
  const { tickets, isLoading: isTicketsLoading, error: ticketsError, init: initTickets, transferTicket } = useTicketsStore();

  useEffect(() => {
    if (isAuthenticated) {
      initProfile();
      initTickets();
    }
  }, [isAuthenticated, initProfile, initTickets]);

  if (!isAuthenticated) {
    return null;
  }

  if (isProfileLoading || isTicketsLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (profileError || ticketsError) {
    return (
      <div style={{ padding: '20px' }}>
        <Text type="danger">Error: {profileError || ticketsError}</Text>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: '20px' }}>
        <Text>No user data available</Text>
      </div>
    );
  }

  const items = [
    {
      key: 'about',
      label: 'О себе',
      children: <AboutTab user={user} />,
    },
    {
      key: 'owned',
      label: 'Созданные мероприятия',
      children: (
        <EventsTab 
          events={ownedEvents} 
          emptyText="У вас пока нет созданных мероприятий" 
        />
      ),
    },
    {
      key: 'subscribed',
      label: 'Подписки',
      children: (
        <EventsTab 
          events={subscribedEvents} 
          emptyText="У вас пока нет подписок на мероприятия" 
        />
      ),
    },
    {
      key: 'tickets',
      label: 'Билеты',
      children: <TicketsTab tickets={tickets} onTransfer={transferTicket} />,
    },
  ];

  const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar size={120} icon={<UserOutlined />} />
            <Title level={2} style={{ marginTop: '16px' }}>
              Профиль пользователя
            </Title>
          </div>

          <Row gutter={16} justify="center">
            <Col style={{ textAlign: 'center' }}>
              <Statistic
                title="Созданные мероприятия"
                value={ownedEvents.length}
                prefix={<CalendarOutlined />}
              />
            </Col>
            <Col style={{ textAlign: 'center' }}>
              <Statistic
                title="Подписки"
                value={subscribedEvents.length}
                prefix={<TeamOutlined />}
              />
            </Col>
            <Col style={{ textAlign: 'center' }}>
              <Statistic
                title="Билеты"
                value={totalTickets}
                prefix={<TagOutlined />}
              />
            </Col>
          </Row>

          <Tabs
            defaultActiveKey="about"
            items={items}
            style={{ marginTop: '16px' }}
          />
        </Space>
      </Card>
    </div>
  );
} 