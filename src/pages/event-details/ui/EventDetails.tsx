'use client';

import React from 'react';
import { Card, Typography, Space, Tag, Flex, Button, Popconfirm, Spin, Alert } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import { useEventDetails } from '@/entities/events';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const EventDetails = () => {
	const { eventDetails, isLoading, error, isRegistered, handleRegister, handleUnregister } = useEventDetails();

	if (isLoading) {
		return (
			<div style={{ padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
				<Spin size="large" />
			</div>
		);
	}

	if (error) {
		return (
			<div style={{ padding: '16px' }}>
				<Alert
					message="Ошибка"
					description={error}
					type="error"
					showIcon
				/>
			</div>
		);
	}

	if (!eventDetails) {
		return (
			<div style={{ padding: '16px' }}>
				<Alert
					message="Мероприятие не найдено"
					description="Запрашиваемое мероприятие не существует."
					type="warning"
					showIcon
				/>
			</div>
		);
	}

	return (
		<div style={{ padding: '16px' }}>
			<Card>
				<Space direction="vertical" size="large" style={{ width: '100%' }}>
					<div
						style={{
							width: '100%',
							height: '300px',
							backgroundImage: `url(https://placehold.co/600x400?text=${encodeURIComponent(eventDetails.title)})`,
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
							<Text>
								{dayjs(eventDetails.dateStart).format('D MMMM YYYY')} - {dayjs(eventDetails.dateEnd).format('D MMMM YYYY')}
							</Text>
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

export default EventDetails; 