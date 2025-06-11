'use client';

import React, { useEffect } from 'react';
import { Card, Typography, Avatar, Space, Tabs, Flex, Statistic, Row, Col, Spin } from 'antd';
import { UserOutlined, CalendarOutlined, TeamOutlined, TagOutlined } from '@ant-design/icons';
import { CardEvent } from '@/entities/events';
import { useAuth } from "@/entities/viewer";
import { useProfileStore } from '@/entities/profile/model/profileModel';
import { UserEvent } from '@/shared/api/users/types';
import { TicketList } from '@/entities/tickets';

const { Title, Text } = Typography;

export default function ProfilePage() {
  const { isAuthenticated } = useAuth();
  const { user, ownedEvents, subscribedEvents, isLoading, error, init } = useProfileStore();

  useEffect(() => {
    init();
  }, [init]);

  if (!isAuthenticated) {
    return null; // This will be handled by middleware, but we keep it as a safety check
  }

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Text type="danger">Error: {error}</Text>
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

  const renderEventCard = (event: UserEvent) => (
    <CardEvent
      key={event.id}
      id={event.id.toString()}
      title={event.title}
      location="Location not available"
      price={0}
      description={event.description}
      imageUrl={undefined}
    />
  );

  const items = [
    {
      key: 'about',
      label: 'О себе',
      children: (
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>Email:</Text>
              <Text> {user.email}</Text>
            </div>
            <div>
              <Text strong>Name:</Text>
              <Text> {user.name}</Text>
            </div>
            <div>
              <Text strong>Registration Date:</Text>
              <Text> {new Date(user.createdAt).toLocaleDateString()}</Text>
            </div>
          </Space>
        </Card>
      ),
    },
    {
      key: 'owned',
      label: 'Созданные мероприятия',
      children: (
        <Flex vertical gap={8}>
          {ownedEvents.length > 0 ? (
            ownedEvents.map(renderEventCard)
          ) : (
            <Text>У вас пока нет созданных мероприятий</Text>
          )}
        </Flex>
      ),
    },
    {
      key: 'subscribed',
      label: 'Подписки',
      children: (
        <Flex vertical gap={8}>
          {subscribedEvents.length > 0 ? (
            subscribedEvents.map(renderEventCard)
          ) : (
            <Text>У вас пока нет подписок на мероприятия</Text>
          )}
        </Flex>
      ),
    },
    {
      key: 'tickets',
      label: 'Билеты',
      icon: <TagOutlined />,
      children: <TicketList />,
    },
  ];

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
            <Col>
              <Statistic
                title="Созданные мероприятия"
                value={ownedEvents.length}
                prefix={<CalendarOutlined />}
              />
            </Col>
            <Col>
              <Statistic
                title="Подписки"
                value={subscribedEvents.length}
                prefix={<TeamOutlined />}
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