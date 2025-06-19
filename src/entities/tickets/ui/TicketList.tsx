'use client';

import React from 'react';
import { Card, Typography, Space, Tag, Button, Alert, Modal, Form, Input, message } from 'antd';
import { UserTicket } from '@/shared/api/tickets/types';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

interface TicketListProps {
  tickets: UserTicket[];
  onTransfer: (ticketId: number, values: { toUserId: number; quantity: number }) => Promise<void>;
}

export const TicketList: React.FC<TicketListProps> = ({ tickets, onTransfer }) => {
  const [isTransferModalVisible, setIsTransferModalVisible] = React.useState(false);
  const [selectedTicket, setSelectedTicket] = React.useState<UserTicket | null>(null);
  const [form] = Form.useForm();
  const router = useRouter();

  const handleTransfer = async (values: { toUserId: number; quantity: number }) => {
    if (!selectedTicket) return;

    try {
      await onTransfer(selectedTicket.id, values);
      message.success('Билет успешно передан');
      setIsTransferModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Не удалось передать билет');
    }
  };

  const handleTicketClick = (ticket: UserTicket) => {
    if (ticket.ticket.eventId) {
      router.push(`/events/${ticket.ticket.eventId}`);
    }
  };

  if (tickets.length === 0) {
    return (
      <div style={{ padding: '20px' }}>
        <Text>У вас пока нет билетов.</Text>
      </div>
    );
  }

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {tickets.map((ticket) => (
          <Card 
            key={ticket.id}
            hoverable
            style={{ cursor: 'pointer' }}
            onClick={() => handleTicketClick(ticket)}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Title level={4} style={{ margin: 0 }}>{ticket.ticket.name}</Title>
                <Text type="secondary">Мероприятие: {ticket.ticket.event?.title}</Text>
              </div>
              
              <Space size="small" wrap>
                <Tag color="blue">Количество: {ticket.quantity}</Tag>
                <Tag color="green">Оплачено: {ticket.totalPaid} ₽</Tag>
                <Tag color={ticket.status === 'COMPLETED' ? 'success' : 'default'}>
                  Статус: {ticket.status === 'COMPLETED' ? 'Активен' : 'Неактивен'}
                </Tag>
              </Space>

              <div>
                <Text>Дата покупки: {new Date(ticket.createdAt).toLocaleDateString('ru-RU')}</Text>
              </div>

              {ticket.status === 'COMPLETED' && (
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when clicking button
                    setSelectedTicket(ticket);
                    setIsTransferModalVisible(true);
                  }}
                >
                  Передать билет
                </Button>
              )}
            </Space>
          </Card>
        ))}
      </Space>

      <Modal
        title="Передача билета"
        open={isTransferModalVisible}
        onCancel={() => {
          setIsTransferModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleTransfer}>
          <Form.Item
            name="toUserId"
            label="ID получателя"
            rules={[{ required: true, message: 'Пожалуйста, введите ID получателя' }]}
          >
            <Input type="number" />
          </Form.Item>
          
          <Form.Item
            name="quantity"
            label="Количество"
            rules={[{ required: true, message: 'Пожалуйста, введите количество' }]}
          >
            <Input type="number" min={1} max={selectedTicket?.quantity} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Передать
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}; 