'use client';

import React from 'react';
import { Card, Typography, Space, Tag, Flex, Button } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';
import { events } from '@/entities/events/model/eventsData';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const EventDetailsPage = () => {
  const params = useParams();
  const eventId = params?.id as string;
  
  const eventDetails = events.find(event => event.id === eventId);

  if (!eventDetails) {
    return (
      <div style={{ padding: '16px' }}>
        <Card>
          <Title level={2}>Event not found</Title>
          <Text>The event you're looking for doesn't exist.</Text>
        </Card>
      </div>
    );
  }

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
              <Text>{eventDetails.date?.format('MMMM D, YYYY')}</Text>
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