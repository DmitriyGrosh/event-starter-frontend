'use client';

import React from 'react';
import { Card, Form, Input, Button, DatePicker, InputNumber, Space, Typography, message, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/entities/viewer';
import { eventService } from '@/shared/api/events';
import { CreateEventRequest, UpdateEventRequest } from '@/shared/api/events/types';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface EventFormData {
  title: string;
  description: string;
  location: string;
  dateRange: [dayjs.Dayjs, dayjs.Dayjs];
  tickets: {
    name: string;
    description: string;
    price: number;
    quantity: number;
  }[];
}

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await eventService.getEventById(params.id);
        form.setFieldsValue({
          title: event.title,
          description: event.description,
          location: event.location,
          dateRange: [dayjs(event.dateStart), dayjs(event.dateEnd)],
          tickets: event.tickets.map(ticket => ({
            name: ticket.name,
            description: ticket.description,
            price: ticket.price,
            quantity: ticket.quantity,
          })),
        });
      } catch (error) {
        message.error('Не удалось загрузить данные мероприятия');
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchEvent();
    }
  }, [params.id, form, router, isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (values: EventFormData) => {
    try {
      setIsSubmitting(true);
      const [dateStart, dateEnd] = values.dateRange;

      const eventData: UpdateEventRequest = {
        title: values.title,
        description: values.description,
        location: values.location,
        dateStart: dateStart.toISOString(),
        dateEnd: dateEnd.toISOString(),
        tickets: values.tickets,
      };

      await eventService.updateEvent(params.id, eventData);

      message.success('Мероприятие успешно обновлено');
      router.push('/');
    } catch (error) {
      message.error('Не удалось обновить мероприятие');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2} style={{ textAlign: 'center', margin: 0 }}>
            Редактирование мероприятия
          </Title>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
          >
            <Form.Item
              name="title"
              label="Название"
              rules={[{ required: true, message: 'Пожалуйста, введите название мероприятия' }]}
            >
              <Input placeholder="Введите название мероприятия" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Описание"
              rules={[{ required: true, message: 'Пожалуйста, введите описание мероприятия' }]}
            >
              <TextArea
                placeholder="Введите описание мероприятия"
                rows={4}
              />
            </Form.Item>

            <Form.Item
              name="location"
              label="Место проведения"
              rules={[{ required: true, message: 'Пожалуйста, укажите место проведения' }]}
            >
              <Input placeholder="Введите место проведения" />
            </Form.Item>

            <Form.Item
              name="dateRange"
              label="Дата и время"
              rules={[{ required: true, message: 'Пожалуйста, выберите дату и время' }]}
            >
              <RangePicker
                showTime
                format="DD.MM.YYYY HH:mm"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.List
              name="tickets"
              rules={[
                {
                  validator: async (_, tickets) => {
                    if (!tickets || tickets.length < 1) {
                      return Promise.reject(new Error('Добавьте хотя бы один тип билета'));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card key={key} style={{ marginBottom: 16 }}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          label="Название билета"
                          rules={[{ required: true, message: 'Введите название билета' }]}
                        >
                          <Input placeholder="Введите название билета" />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'description']}
                          label="Описание билета"
                          rules={[{ required: true, message: 'Введите описание билета' }]}
                        >
                          <TextArea placeholder="Введите описание билета" rows={2} />
                        </Form.Item>

                        <Space>
                          <Form.Item
                            {...restField}
                            name={[name, 'price']}
                            label="Цена"
                            rules={[{ required: true, message: 'Укажите цену' }]}
                          >
                            <InputNumber
                              placeholder="Цена"
                              min={0}
                              formatter={(value) => `${value} ₽`}
                              // @ts-ignore
                              parser={(value) => value ? Number(value.replace(/[^\d]/g, '')) : 0}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'quantity']}
                            label="Количество"
                            rules={[{ required: true, message: 'Укажите количество' }]}
                          >
                            <InputNumber
                              placeholder="Количество"
                              min={1}
                            />
                          </Form.Item>
                        </Space>

                        {fields.length > 1 && (
                          <Button type="link" danger onClick={() => remove(name)}>
                            Удалить билет
                          </Button>
                        )}
                      </Space>
                    </Card>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Добавить тип билета
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                style={{ width: '100%' }}
              >
                Сохранить изменения
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
}
