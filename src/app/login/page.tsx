'use client'

import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {useAuth} from "@/entities/viewer";

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await login({ email: values.email, password: values.password });
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
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
      <Card style={{ width: 400, padding: '24px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
          Вход
        </Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите ваш email!' },
              { type: 'email', message: 'Пожалуйста, введите корректный email!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Войти
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            Нет аккаунта?{' '}
            <Link href="/register">Зарегистрироваться</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
} 