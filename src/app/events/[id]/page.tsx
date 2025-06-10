'use client';

import React from 'react';
import { Card, Typography, Space, Tag, Flex, Button } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';

const { Title, Text } = Typography;

const EventDetailsPage = () => {
  const params = useParams();
  const eventId = params.id;

  // This would typically come from an API call using the eventId
  const eventDetails = {
    title: "Elevate: The Conference for Professional Growth",
    location: "Los Angeles",
    price: 300,
    imageUrl: "https://optim.tildacdn.com/tild6138-3133-4732-a336-316166613961/-/cover/600x600/center/center/-/format/webp/photo_2016-09-15_16-.jpg.webp",
    description: "Join us for an exciting conference focused on professional development and networking.",
    date: "June 20, 2024",
    organizer: "Tech Events Inc.",
    attendees: 150
  };

  return (
    <div style={{ padding: '16px' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div
            style={{
              width: '100%',
              height: '300px',
              backgroundImage: `url(${eventDetails.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px'
            }}
          />
          
          <Title level={2}>{eventDetails.title}</Title>
          
          <Space direction="vertical" size="middle">
            <Space>
              <EnvironmentOutlined />
              <Text>{eventDetails.location}</Text>
            </Space>
            
            <Space>
              <CalendarOutlined />
              <Text>{eventDetails.date}</Text>
            </Space>
            
            <Space>
              <UserOutlined />
              <Text>Organizer: {eventDetails.organizer}</Text>
            </Space>
            
            <Text>{eventDetails.description}</Text>
            
            <Flex justify="space-between" align="center">
              <Tag color="blue" style={{ fontSize: '16px', padding: '4px 8px' }}>
                {eventDetails.price === 0 ? 'Бесплатно' : `${eventDetails.price.toLocaleString('ru-RU')}₽`}
              </Tag>
              <Button type="primary" size="large">
                Register Now
              </Button>
            </Flex>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default EventDetailsPage; 