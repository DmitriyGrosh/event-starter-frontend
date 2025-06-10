'use client';

import React from 'react';
import { Card, Typography, Space, Button, List, Badge, Flex } from 'antd';
import { BellOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { useNotificationsStore } from '@/entities/notifications/model/notificationsData';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, removeNotification } = useNotificationsStore();

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  return (
    <div style={{ padding: '16px' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Flex justify="space-between" align="center">
            <Title level={2}>Уведомления</Title>
            <Button 
              type="primary" 
              icon={<CheckOutlined />}
              onClick={handleMarkAllAsRead}
            >
              Отметить все как прочитанные
            </Button>
          </Flex>

          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(notification) => (
              <List.Item
                actions={[
                  <Button 
                    type="text" 
                    icon={<CheckOutlined />} 
                    onClick={() => markAsRead(notification.id)}
                    disabled={notification.read}
                  >
                    {notification.read ? 'Прочитано' : 'Отметить как прочитанное'}
                  </Button>,
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={() => removeNotification(notification.id)}
                  >
                    Удалить
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Badge dot={!notification.read}>
                      {notification.icon}
                    </Badge>
                  }
                  title={notification.title}
                  description={
                    <Space direction="vertical" size="small">
                      <Text>{notification.description}</Text>
                      <Text type="secondary">{notification.time}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Space>
      </Card>
    </div>
  );
};

export default NotificationsPage; 