'use client';

import React from 'react';
import { Card, Typography, Space, Alert } from 'antd';
import { User } from '@/shared/api/auth/types';

const { Text } = Typography;

interface AboutTabProps {
  user: User;
}

export const AboutTab: React.FC<AboutTabProps> = ({ user }) => {
  if (!user) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert
          message="Нет данных"
          description="Информация о пользователе недоступна"
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Card>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>Email:</Text>
            <Text> {user.email}</Text>
          </div>
          <div>
            <Text strong>Name:</Text>
            <Text> {user.name}</Text>
          </div>
          <div>
            <Text strong>Registration Date:</Text>
            <Text> {new Date(user.createdAt).toLocaleDateString()}</Text>
          </div>
        </Space>
      </Card>
    </div>
  );
}; 