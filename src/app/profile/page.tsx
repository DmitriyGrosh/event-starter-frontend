'use client';

import React from 'react';
import { Card, Typography, Avatar, Space, Tabs, Flex, Statistic, Row, Col } from 'antd';
import { UserOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { useAuth } from '@/shared/context/auth-context';
import { CardEvent } from '@/entities/events';
import { events } from '@/entities/events/model/eventsData';

const { Title, Text } = Typography;

export default function ProfilePage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null; // This will be handled by middleware, but we keep it as a safety check
  }

  // For demo purposes, we'll show the first 3 events as user's events
  const userEvents = events.slice(0, 3);

  const items = [
    {
      key: 'about',
      label: 'О себе',
      children: (
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>Email:</Text>
              <Text> user@example.com</Text>
            </div>
            <div>
              <Text strong>Имя:</Text>
              <Text> Иван Иванов</Text>
            </div>
            <div>
              <Text strong>Дата регистрации:</Text>
              <Text> 01.01.2024</Text>
            </div>
          </Space>
        </Card>
      ),
    },
    {
      key: 'events',
      label: 'Мероприятия',
      children: (
        <Flex vertical gap={8}>
          {userEvents.map((event) => (
            <CardEvent
              key={event.id}
              id={event.id}
              title={event.title}
              location={event.location}
              price={event.price}
              imageUrl={event.imageUrl}
              description={event.description}
            />
          ))}
        </Flex>
      ),
    },
    {
      key: 'reviews',
      label: 'Отзывы',
      children: (
        <Card>
          <Text>Отзывы будут здесь</Text>
        </Card>
      ),
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
                title="Мероприятия"
                value={userEvents.length}
                prefix={<CalendarOutlined />}
              />
            </Col>
            <Col>
              <Statistic
                title="Подписчики"
                value={0}
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