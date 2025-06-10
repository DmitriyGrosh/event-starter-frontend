'use client';

import React, { useState } from 'react';
import { Card, Typography, Space, Tag, Flex, Button, message, Popconfirm } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import { events } from '@/entities/events/model/eventsData';
import { useAuth } from '@/shared/context/auth-context';
import { useNotificationsStore } from '@/entities/notifications/model/notificationsData';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const EventDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const { addNotification } = useNotificationsStore();
  const eventId = params?.id as string;
  
  const eventDetails = events.find(event => event.id === eventId);

  if (!eventDetails) {
    return (
      <div style={{ padding: '16px' }}>
        <Card>
          <Title level={2}>Мероприятие не найдено</Title>
          <Text>Запрашиваемое мероприятие не существует.</Text>
        </Card>
      </div>
    );
  }

  const handleRegister = () => {
    if (!isAuthenticated) {
      message.info('Пожалуйста, войдите в систему для регистрации на мероприятие');
      router.push('/login');
      return;
    }

    setIsRegistered(true);
    message.success('Успешная регистрация на мероприятие!');
    
    // Add notification
    addNotification({
      type: 'event',
      title: 'Регистрация на мероприятие',
      description: `Вы успешно зарегистрировались на мероприятие "${eventDetails.title}"`,
      time: 'Только что',
    });
  };

  const handleUnregister = () => {
    setIsRegistered(false);
    message.success('Регистрация на мероприятие отменена');
    
    // Add notification
    addNotification({
      type: 'event',
      title: 'Отмена регистрации',
      description: `Вы отменили регистрацию на мероприятие "${eventDetails.title}"`,
      time: 'Только что',
    });
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
              <Text>{eventDetails.date?.format('D MMMM YYYY')}</Text>
            </Space>
            
            <Text>{eventDetails.description}</Text>
            
            <Flex justify="space-between" align="center">
              <Tag color="blue" style={{ fontSize: '16px', padding: '4px 8px' }}>
                {eventDetails.price === 0 ? 'Бесплатно' : `${eventDetails.price.toLocaleString('ru-RU')}₽`}
              </Tag>
              {isRegistered ? (
                <Popconfirm
                  title="Отмена регистрации"
                  description="Вы уверены, что хотите отменить регистрацию на это мероприятие?"
                  onConfirm={handleUnregister}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button type="default" size="large">
                    Отменить регистрацию
                  </Button>
                </Popconfirm>
              ) : (
                <Button 
                  type="primary" 
                  size="large"
                  onClick={handleRegister}
                >
                  Зарегистрироваться
                </Button>
              )}
            </Flex>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default EventDetailsPage; 