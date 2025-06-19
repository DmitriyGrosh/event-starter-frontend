'use client';

import {Card, Typography, Space, Tag, Flex} from "antd";
import {EnvironmentOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

const {Text, Title} = Typography;

interface CardEventProps {
	id: string;
	title: string;
	location: string;
	tickets: Array<{
		id: number;
		name: string;
		price: number;
		quantity: number;
		eventId: number;
		createdAt: string;
		description: string;
	}>;
	description: string;
	imageUrl?: string;
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop";

export const CardEvent = ({
	title,
	location,
	tickets,
	imageUrl = DEFAULT_IMAGE,
	id,
	description
}: CardEventProps) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/events/${id}`);
	};

	// Calculate price from tickets
	const getPriceDisplay = () => {
		if (!tickets || tickets.length === 0) {
			return null;
		}
		
		const prices = tickets.map(ticket => ticket.price);
		const minPrice = Math.min(...prices);
		const maxPrice = Math.max(...prices);
		
		if (minPrice === 0 && maxPrice === 0) {
			return 'Бесплатно';
		}
		
		if (minPrice === maxPrice) {
			return minPrice === 0 ? 'Бесплатно' : `${minPrice} ₽`;
		}
		
		return `${minPrice} - ${maxPrice} ₽`;
	};

	return (
		<Card
			size="small"
			onClick={handleClick}
			style={{ cursor: 'pointer' }}
		>
			<div
				style={{
					width: '90px',
					height: '90px',
					backgroundImage: `url(${imageUrl})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					borderRadius: '4px',
					flexShrink: 0
				}}
			/>
			<Space direction="vertical" size="small" style={{flex: 1, minWidth: 0}}>
				<Title level={5} style={{margin: 0, overflow: 'hidden', textOverflow: 'ellipsis'}}>
					{title}
				</Title>
				<Text type="secondary" style={{fontSize: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
					{description}
				</Text>
				<Flex justify="space-between" align="center" gap={16}>
					<Space>
						<EnvironmentOutlined style={{color: '#8C8C8C'}}/>
						<Text type="secondary" style={{fontSize: '14px'}}>
							{location}
						</Text>
					</Space>
					<Tag color="blue" style={{margin: 0}}>
						{getPriceDisplay()}
					</Tag>
				</Flex>
			</Space>
		</Card>
	);
};
