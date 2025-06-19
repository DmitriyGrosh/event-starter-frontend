'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Card, Flex, Badge, List, Row, Col, Button } from 'antd';
import { CardEvent } from '@/entities/events';
import dayjs from 'dayjs';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useAuth } from "@/entities/viewer";
import { useProfileStore } from '@/entities/profile/model/profileModel';

const { Title } = Typography;

const CalendarPage = () => {
  const { isAuthenticated } = useAuth();
  const { ownedEvents, subscribedEvents, init, isLoading } = useProfileStore();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    if (isAuthenticated) {
      init();
    }
  }, [isAuthenticated, init]);

  const prevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const nextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const allEvents = [...ownedEvents, ...subscribedEvents];

  const renderCalendarDays = () => {
    const days = [];
    const firstDayOfMonth = currentDate.startOf('month').day();
    const daysInMonth = currentDate.daysInMonth();
    const lastDayOfMonth = (firstDayOfMonth + daysInMonth) % 7;

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Col key={`empty-start-${i}`} span={3} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = currentDate.date(day);
      const eventsOnDate = allEvents.filter(event => 
        dayjs(event.dateStart).isSame(date, 'day') || 
        dayjs(event.dateEnd).isSame(date, 'day')
      );
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

  const filteredEvents = allEvents.filter(event => 
    dayjs(event.dateStart).isSame(selectedDate, 'day') || 
    dayjs(event.dateEnd).isSame(selectedDate, 'day')
  );

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
	              tickets={[]}
                id={event.id.toString()}
                title={event.title}
                location="Location not available"
                description={event.description}
                imageUrl={event.imageUrl || undefined}
              />
            </List.Item>
          )}
        />
      </Card>
    </Flex>
  );
};

export default CalendarPage; 