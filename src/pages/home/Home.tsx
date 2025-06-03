'use client';

import React from 'react';
import { Layout, Menu, Typography, Card, Row, Col, Button } from 'antd';
import { HomeOutlined, CalendarOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div style={{maxWidth: '1200px', margin: '0 auto'}}>
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
              <div style={{
                height: '200px',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CalendarOutlined style={{fontSize: '48px', color: '#1890ff'}}/>
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
              <div style={{
                height: '200px',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TeamOutlined style={{fontSize: '48px', color: '#1890ff'}}/>
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
              <div style={{
                height: '200px',
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <SettingOutlined style={{fontSize: '48px', color: '#1890ff'}}/>
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
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
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
                <div style={{
                  height: '200px',
                  background: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CalendarOutlined style={{fontSize: '48px', color: '#1890ff'}}/>
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
                <div style={{
                  height: '200px',
                  background: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TeamOutlined style={{fontSize: '48px', color: '#1890ff'}}/>
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
                <div style={{
                  height: '200px',
                  background: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <SettingOutlined style={{fontSize: '48px', color: '#1890ff'}}/>
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
    </div>
  );
}

export default Home;
