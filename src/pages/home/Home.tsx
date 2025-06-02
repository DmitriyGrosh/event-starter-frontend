'use client';

import React from 'react';
import { Layout, Menu, Typography, Card, Row, Col, Button } from 'antd';
import { HomeOutlined, CalendarOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px', background: '#fff' }}>
        <div style={{ color: '#1890ff', fontSize: '24px', fontWeight: 'bold' }}>
          Event Starter
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ flex: 1, justifyContent: 'flex-end' }}
          items={[
            { key: '1', icon: <HomeOutlined />, label: 'Home' },
            { key: '2', icon: <CalendarOutlined />, label: 'Events' },
            { key: '3', icon: <TeamOutlined />, label: 'Community' },
            { key: '4', icon: <SettingOutlined />, label: 'Settings' },
          ]}
        />
      </Header>

      <Content style={{ padding: '24px 50px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card>
                <Title level={2}>Welcome to Event Starter</Title>
                <Paragraph>
                  Discover and create amazing events in your community. Connect with people who share your interests
                  and make memorable experiences together.
                </Paragraph>
                <Button type="primary" size="large">
                  Create Event
                </Button>
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable
                cover={
                  <div style={{ height: '200px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CalendarOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  </div>
                }
              >
                <Card.Meta
                  title="Upcoming Events"
                  description="Browse through our curated list of upcoming events in your area."
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable
                cover={
                  <div style={{ height: '200px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TeamOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  </div>
                }
              >
                <Card.Meta
                  title="Community Groups"
                  description="Join groups of like-minded people and expand your network."
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable
                cover={
                  <div style={{ height: '200px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SettingOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  </div>
                }
              >
                <Card.Meta
                  title="Organize Events"
                  description="Create and manage your own events with our easy-to-use tools."
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>
        Event Starter ©{new Date().getFullYear()} Created with Ant Design
      </Footer>
    </Layout>
  );
}

export default Home;
