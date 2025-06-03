'use client';

import {FC} from "react";
import {Card, Typography, Space, Tag, Flex} from "antd";
import {EnvironmentOutlined} from "@ant-design/icons";

const {Text, Title} = Typography;

interface CardEventProps {
	title: string;
	location: string;
	price: number;
	imageUrl: string;
}

export const CardEvent: FC<CardEventProps> = ({
	title,
	location,
	price,
	imageUrl
}) => {
	return (
		<Card
			size="small"
			bodyStyle={{
				padding: '8px',
				display: 'flex',
				gap: '8px',
				justifyContent: "space-between"
			}}
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
				<Flex justify="space-between" align="center">
					<Space>
						<EnvironmentOutlined style={{color: '#8C8C8C'}}/>
						<Text type="secondary" style={{fontSize: '14px'}}>
							{location}
						</Text>
					</Space>
					<Tag color="blue" style={{margin: 0}}>
						{price === 0 ? 'Бесплатно' : `${price.toLocaleString('ru-RU')}₽`}
					</Tag>
				</Flex>
			</Space>
		</Card>
	);
};
