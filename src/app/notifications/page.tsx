'use client';

import React from 'react';
import { Card, Typography, List, Badge, Space } from 'antd';
import { useAuth } from '@/shared/context/auth-context';
import { BellOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function NotificationsPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null; // This will be handled by middleware, but we keep it as a safety check
  }

  // Example notifications data
  const notifications = [
    {
      id: 1,
      type: 'event',
      title: 'Новое мероприятие',
      description: 'Завтра состоится встреча команды',
      time: '2 часа назад',
      read: false,
      icon: <CalendarOutlined style={{ fontSize: '20px' }} />,
    },
    {
      id: 2,
      type: 'system',
      title: 'Обновление профиля',
      description: 'Ваш профиль был успешно обновлен',
      time: '5 часов назад',
      read: true,
      icon: <UserOutlined style={{ fontSize: '20px' }} />,
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Напоминание',
      description: 'Не забудьте подготовиться к завтрашней презентации',
      time: '1 день назад',
      read: true,
      icon: <BellOutlined style={{ fontSize: '20px' }} />,
    },
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Title level={2} style={{ marginBottom: '24px' }}>
          Уведомления
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Badge dot={!item.read}>
                    {item.icon}
                  </Badge>
                }
                title={
                  <Space>
                    <Text strong>{item.title}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {item.time}
                    </Text>
                  </Space>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
} 