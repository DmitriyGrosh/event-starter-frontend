'use client'

import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {useAuth} from "@/entities/viewer";

const { Title } = Typography;

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: { 
    name: string;
    email: string; 
    password: string;
    confirmPassword: string;
  }) => {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password
      });
      
      messageApi.success('Регистрация успешна!');
      router.push('/');
    } catch (error) {
      console.error('Registration failed:', error);
      messageApi.error('Ошибка регистрации. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      {contextHolder}
      <Card style={{ width: 400, padding: '24px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Регистрация
        </Title>
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Полное имя" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите ваш email!' },
              { type: 'email', message: 'Пожалуйста, введите корректный email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
              { min: 6, message: 'Пароль должен содержать минимум 6 символов!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Пожалуйста, подтвердите пароль!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Подтвердите пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Зарегистрироваться
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            Уже есть аккаунт?{' '}
            <Link href="/login">Войти</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
} 