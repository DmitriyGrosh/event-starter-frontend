'use client';

import React from 'react';
import { Card, Typography, Space, Tag, Flex, Spin, Alert } from 'antd';
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { useSubscriptionStore } from '../model/subscriptionModel';

const { Text, Title } = Typography;

export const SubscriptionList = () => {
  const router = useRouter();
  const { subscriptions, isLoading, error, init } = useSubscriptionStore();

  React.useEffect(() => {
    init();
  }, [init]);

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
        <Alert
          message="Ошибка"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <Text type="secondary">У вас пока нет подписок на мероприятия</Text>
      </div>
    );
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {subscriptions.map((subscription) => (
        <Card 
          key={subscription.event.id} 
          size="small"
          onClick={() => router.push(`/events/${subscription.event.id}`)}
          style={{ cursor: 'pointer' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={5} style={{ margin: 0 }}>
              {subscription.event.title}
            </Title>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              {subscription.event.description}
            </Text>
            <Flex justify="space-between" align="center">
              <Space>
                <EnvironmentOutlined style={{ color: '#8C8C8C' }} />
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  {subscription.event.location}
                </Text>
              </Space>
              <Space>
                <CalendarOutlined style={{ color: '#8C8C8C' }} />
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  {dayjs(subscription.event.dateStart).format('D MMMM YYYY')}
                </Text>
              </Space>
            </Flex>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Подписка оформлена: {dayjs(subscription.createdAt).format('D MMMM YYYY')}
            </Text>
          </Space>
        </Card>
      ))}
    </Space>
  );
}; 