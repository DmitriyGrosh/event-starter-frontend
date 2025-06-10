'use client';

import React from 'react';
import { Typography, Card, Avatar, Tabs, Space, Statistic, Row, Col, Flex } from 'antd';
import { UserOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { CardEvent } from '@/entities/events';
import { events } from '@/entities/events/model/eventsData';

const { Title, Text } = Typography;

const ProfilePage = () => {
  // For demo purposes, we'll show the first 3 events as user's events
  const userEvents = events.slice(0, 3);

  const items = [
    {
      key: 'about',
      label: 'О себе',
      children: (
        <Card>
          <Text>Информация о пользователе будет здесь</Text>
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
    <div style={{ padding: '16px' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar size={120} icon={<UserOutlined />} />
            <Title level={2} style={{ marginTop: '16px' }}>Имя пользователя</Title>
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
};

export default ProfilePage; 