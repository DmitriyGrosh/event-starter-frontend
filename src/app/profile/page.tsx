'use client';

import React from 'react';
import { Typography, Card, Avatar, Tabs, Space, Statistic, Row, Col, Flex } from 'antd';
import { UserOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { CardEvent } from '@/entities/events';

const { Title, Text } = Typography;

const ProfilePage = () => {
  // Mock data for events
  const userEvents = [
    {
      id: "1",
      title: "Tech Conference 2024",
      location: "Москва",
      price: 5000,
      imageUrl: "https://optim.tildacdn.com/tild6138-3133-4732-a336-316166613961/-/cover/600x600/center/center/-/format/webp/photo_2016-09-15_16-.jpg.webp"
    },
    {
      id: "2",
      title: "Startup Meetup",
      location: "Санкт-Петербург",
      price: 0,
      imageUrl: "https://optim.tildacdn.com/tild6138-3133-4732-a336-316166613961/-/cover/600x600/center/center/-/format/webp/photo_2016-09-15_16-.jpg.webp"
    },
    {
      id: "3",
      title: "Design Workshop",
      location: "Казань",
      price: 3000,
      imageUrl: "https://optim.tildacdn.com/tild6138-3133-4732-a336-316166613961/-/cover/600x600/center/center/-/format/webp/photo_2016-09-15_16-.jpg.webp"
    }
  ];

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
          {userEvents.map((event, index) => (
            <CardEvent
              key={index}
              id={event.id}
              title={event.title}
              location={event.location}
              price={event.price}
              imageUrl={event.imageUrl}
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