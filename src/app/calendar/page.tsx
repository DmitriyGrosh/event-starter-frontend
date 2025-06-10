'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Card, Flex, Badge, List, Row, Col, Button } from 'antd';
import { CardEvent } from '@/entities/events';
import type { Moment } from 'moment';
import moment from 'moment';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Mock data for events
const mockEvents = [
  {
    title: "Tech Conference 2024",
    location: "Москва",
    price: 5000,
    imageUrl: "https://optim.tildacdn.com/tild6138-3133-4732-a336-316166613961/-/cover/600x600/center/center/-/format/webp/photo_2016-09-15_16-.jpg.webp",
    date: moment('2025-06-20')
  },
  {
    title: "Startup Meetup",
    location: "Санкт-Петербург",
    price: 0,
    imageUrl: "https://optim.tildacdn.com/tild6138-3133-4732-a336-316166613961/-/cover/600x600/center/center/-/format/webp/photo_2016-09-15_16-.jpg.webp",
    date: moment('2025-06-23')
  },
  {
    title: "Design Workshop",
    location: "Казань",
    price: 3000,
    imageUrl: "https://optim.tildacdn.com/tild6138-3133-4732-a336-316166613961/-/cover/600x600/center/center/-/format/webp/photo_2016-09-15_16-.jpg.webp",
    date: moment('2025-06-25')
  }
];

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState<Moment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);

  useEffect(() => {
    const now = moment();
    setCurrentDate(now);
    setSelectedDate(now);
  }, []);

  if (!currentDate || !selectedDate) {
    return null;
  }

  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf('month').day();
  const lastDayOfMonth = currentDate.endOf('month').day();

  const prevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  const renderCalendarDays = () => {
    const days = [];
    const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    // Add week day headers
    weekDays.forEach(day => {
      days.push(
        <Col key={day} span={3} style={{ textAlign: 'center', padding: '8px' }}>
          <strong>{day}</strong>
        </Col>
      );
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Col key={`empty-${i}`} span={3} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = currentDate.clone().date(day);
      const eventsOnDate = mockEvents.filter(event => event.date.isSame(date, 'day'));
      const isSelected = selectedDate.isSame(date, 'day');

      days.push(
        <Col 
          key={day} 
          span={3} 
          style={{ 
            textAlign: 'center', 
            padding: '8px',
            cursor: 'pointer',
            backgroundColor: isSelected ? '#e6f7ff' : 'transparent',
            borderRadius: '4px'
          }}
          onClick={() => setSelectedDate(date)}
        >
          <div>{day}</div>
          {eventsOnDate.length > 0 && (
            <Badge count={eventsOnDate.length} style={{ marginTop: '4px' }} />
          )}
        </Col>
      );
    }

    // Add empty cells for days after the last day of the month
    for (let i = lastDayOfMonth; i < 6; i++) {
      days.push(<Col key={`empty-end-${i}`} span={3} />);
    }

    return days;
  };

  const filteredEvents = mockEvents.filter(event => 
    event.date.isSame(selectedDate, 'day')
  );

  return (
    <Flex vertical gap={16} style={{ padding: '16px' }}>
      <Card>
        <Flex justify="space-between" align="center" style={{ marginBottom: '16px' }}>
          <Button icon={<LeftOutlined />} onClick={prevMonth} />
          <Title level={3} style={{ margin: 0 }}>
            {currentDate.format('MMMM YYYY')}
          </Title>
          <Button icon={<RightOutlined />} onClick={nextMonth} />
        </Flex>
        <Row gutter={[0, 8]}>
          {renderCalendarDays()}
        </Row>
      </Card>
      
      <Card>
        <Title level={3}>События на {selectedDate.format('DD.MM.YYYY')}</Title>
        <List
          dataSource={filteredEvents}
          renderItem={(event) => (
            <List.Item>
              <CardEvent
                title={event.title}
                location={event.location}
                price={event.price}
                imageUrl={event.imageUrl}
              />
            </List.Item>
          )}
        />
      </Card>
    </Flex>
  );
};

export default CalendarPage; 