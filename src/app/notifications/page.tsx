'use client';

import React from 'react';
import { Typography, Card, List, Avatar, Space } from 'antd';
import { UserOutlined, CalendarOutlined, BellOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

// Mock data for notifications - replace with real data later
const notifications = [
  {
    id: 1,
    type: 'event',
    eventId: '1',
    title: 'Новое мероприятие',
    description: 'Tech Conference 2024 начинается через 2 дня',
    time: '10 минут назад',
    icon: <CalendarOutlined />
  },
  {
    id: 2,
    type: 'message',
    title: 'Новое сообщение',
    description: 'Вы получили новое сообщение от пользователя',
    time: '1 час назад',
    icon: <UserOutlined />
  },
  {
    id: 3,
    type: 'event',
    eventId: '2',
    title: 'Напоминание о мероприятии',
    description: 'Startup Meetup начинается завтра',
    time: '2 часа назад',
    icon: <BellOutlined />
  }
];

const NotificationsPage = () => {
  const router = useRouter();

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    if (notification.type === 'event' && notification.eventId) {
      router.push(`/events/${notification.eventId}`);
    }
  };

  return (
    <Card>
      <Title level={2}>Уведомления</Title>
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item 
            onClick={() => handleNotificationClick(item)}
            style={{ 
              cursor: item.type === 'event' ? 'pointer' : 'default',
              transition: 'background-color 0.3s',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              if (item.type === 'event') {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <List.Item.Meta
              avatar={<Avatar icon={item.icon} />}
              title={item.title}
              description={
                <Space direction="vertical" size={0}>
                  <Text>{item.description}</Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>{item.time}</Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default NotificationsPage; 