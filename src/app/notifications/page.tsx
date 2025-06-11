'use client';

import React, {useEffect} from 'react';
import { Card, Typography, Space, Button, List, Flex } from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { useNotificationsStore } from '@/entities/notifications';

const { Title, Text } = Typography;

const NotificationsPage = () => {
  const { notifications, markAsRead, fetchData } = useNotificationsStore();

	useEffect(() => {
		fetchData();
	}, [fetchData]);

  return (
    <div style={{ padding: '16px' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Flex justify="space-between" align="center">
            <Title level={2}>Уведомления</Title>
            <Button 
              type="primary" 
              icon={<CheckOutlined />}
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
                  >
                    Удалить
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={notification.title}
                  description={
                    <Space direction="vertical" size="small">
                      <Text>{notification.title}</Text>
                      <Text type="secondary">{notification.message}</Text>
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