'use client';

import {useEventDetails} from "@/entities/events";
import {Alert, Button, Card, Flex, Popconfirm, Space, Spin, Tag, Typography, Divider, message, InputNumber} from "antd";
import {CalendarOutlined, EnvironmentOutlined, UserOutlined, TagOutlined, ShoppingOutlined, HeartOutlined, HeartFilled, EditOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {ticketsService} from "@/shared/api/tickets/service";
import {useState, useEffect} from "react";
import {useSubscriptionStore} from "@/entities/subscriptions";
import {useAuth} from "@/entities/viewer";
import {useRouter} from "next/navigation";

const { Title, Text, Paragraph } = Typography;

export default function Page() {
	const { eventDetails, isLoading, error, refetch } = useEventDetails();
	const [purchasingTicketId, setPurchasingTicketId] = useState<number | null>(null);
	const [ticketQuantities, setTicketQuantities] = useState<Record<number, number>>({});
	const { subscriptions, subscribe, unsubscribe, init: initSubscriptions } = useSubscriptionStore();
	const [isSubscribed, setIsSubscribed] = useState(false);
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		initSubscriptions();
	}, [initSubscriptions]);

	useEffect(() => {
		if (eventDetails && subscriptions) {
			const isUserSubscribed = subscriptions.some(sub => sub.event.id === eventDetails.id);
			setIsSubscribed(isUserSubscribed);
		}
	}, [eventDetails, subscriptions]);

	const handleSubscribe = async () => {
		if (!eventDetails) return;
		try {
			if (isSubscribed) {
				await unsubscribe(eventDetails.id);
				message.success('Вы отписались от мероприятия');
			} else {
				await subscribe(eventDetails.id);
				message.success('Вы подписались на мероприятие');
			}
		} catch (error) {
			message.error('Произошла ошибка при изменении подписки');
		}
	};

	const handleEdit = () => {
		if (!eventDetails) return;
		router.push(`/events/${eventDetails.id}/edit`);
	};

	const handleBuyTicket = async (ticketId: number) => {
		try {
			setPurchasingTicketId(ticketId);
			const quantity = ticketQuantities[ticketId] || 1;
			const purchase = await ticketsService.buyTicket(ticketId, { quantity });
			message.success(`Успешно приобретено ${quantity} билетов!`);
			console.log('Ticket purchased:', purchase);
			
			// Update ticket quantity in the UI
			if (eventDetails?.tickets) {
				const updatedTickets = eventDetails.tickets.map(ticket => {
					if (ticket.id === ticketId) {
						return {
							...ticket,
							quantity: ticket.quantity - quantity
						};
					}
					return ticket;
				});
				
				// Update the event details with new ticket quantities
				eventDetails.tickets = updatedTickets;
			}
			
			// Reset quantity for this ticket
			setTicketQuantities(prev => ({
				...prev,
				[ticketId]: 1
			}));
			
			// Refetch event details to ensure we have the latest data
			await refetch();
		} catch (error) {
			message.error('Ошибка при покупке билета');
			console.error('Failed to purchase ticket:', error);
		} finally {
			setPurchasingTicketId(null);
		}
	};

	const handleQuantityChange = (ticketId: number, value: number | null) => {
		setTicketQuantities(prev => ({
			...prev,
			[ticketId]: value || 1
		}));
	};

	if (isLoading) {
		return (
			<div style={{ padding: '16px' }}>
				<Flex justify="center" align="center" style={{ height: '200px' }}>
					<Spin size="large" />
				</Flex>
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

	const isOwner = user?.id === eventDetails.ownerId;
	const url = eventDetails.imageUrl ?? `https://placehold.co/600x400?text=${encodeURIComponent(eventDetails.title)}`;

	return (
		<div style={{ padding: '16px' }}>
			<Card>
				<Space direction="vertical" size="large" style={{ width: '100%' }}>
					<div
						style={{
							width: '100%',
							height: '300px',
							backgroundImage: `url(${url})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							borderRadius: '8px'
						}}
					/>

					<Flex justify="space-between" align="center">
						<Title level={2}>{eventDetails.title}</Title>
						<Space>
							{isOwner && (
								<Button
									type="default"
									icon={<EditOutlined />}
									onClick={handleEdit}
								>
									Редактировать
								</Button>
							)}
							<Button
								type={isSubscribed ? "primary" : "default"}
								icon={isSubscribed ? <HeartFilled /> : <HeartOutlined />}
								onClick={handleSubscribe}
							>
								{isSubscribed ? 'Отписаться' : 'Подписаться'}
							</Button>
						</Space>
					</Flex>

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

						<Space>
							<UserOutlined />
							<Text>Организатор: {eventDetails.owner.name}</Text>
						</Space>

						<Divider />

						<Space direction="vertical" style={{ width: '100%' }}>
							<Title level={4}>Описание</Title>
							<Paragraph>{eventDetails.description}</Paragraph>
						</Space>

						{eventDetails.tags && eventDetails.tags.length > 0 && (
							<Space direction="vertical" style={{ width: '100%' }}>
								<Title level={4}>
									<TagOutlined /> Теги
								</Title>
								<Space wrap>
									{eventDetails.tags.map((tag) => (
										<Tag key={tag} color="blue">
											{tag}
										</Tag>
									))}
								</Space>
							</Space>
						)}

						{eventDetails.tickets && eventDetails.tickets.length > 0 && (
							<Space direction="vertical" style={{ width: '100%' }}>
								<Title level={4}>
									<ShoppingOutlined /> Билеты
								</Title>
								<Space direction="vertical" style={{ width: '100%' }}>
									{eventDetails.tickets.map((ticket) => (
										<Card key={ticket.id} size="small">
											<Space direction="vertical" style={{ width: '100%' }}>
												<Text strong>{ticket.name}</Text>
												<Text type="secondary">{ticket.description}</Text>
												<Flex justify="space-between" align="center">
													<Text>Количество: {ticket.quantity}</Text>
													<Tag color="green">
														{ticket.price === 0 ? 'Бесплатно' : `${ticket.price.toLocaleString('ru-RU')}₽`}
													</Tag>
												</Flex>
												<Flex justify="space-between" align="center">
													<Space>
														<Text>Количество билетов:</Text>
														<InputNumber
															min={1}
															max={ticket.quantity}
															value={ticketQuantities[ticket.id] || 1}
															onChange={(value) => handleQuantityChange(ticket.id, value)}
															disabled={ticket.quantity <= 0}
														/>
													</Space>
													<Popconfirm
														title="Покупка билетов"
														description={`Вы уверены, что хотите купить ${ticketQuantities[ticket.id] || 1} билет(ов) "${ticket.name}"?`}
														onConfirm={() => handleBuyTicket(ticket.id)}
														okText="Да"
														cancelText="Нет"
													>
														<Button
															type="primary"
															loading={purchasingTicketId === ticket.id}
															disabled={ticket.quantity <= 0}
														>
															Купить билеты
														</Button>
													</Popconfirm>
												</Flex>
											</Space>
										</Card>
									))}
								</Space>
							</Space>
						)}

						<Divider />

						<Flex justify="space-between" align="center">
							<Tag color="blue" style={{ fontSize: '16px', padding: '4px 8px' }}>
								{eventDetails.price === 0 ? 'Бесплатно' : `${eventDetails.price.toLocaleString('ru-RU')}₽`}
							</Tag>
						</Flex>
					</Space>
				</Space>
			</Card>
		</div>
	);
}