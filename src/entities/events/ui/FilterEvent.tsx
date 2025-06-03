'use client';

import React, {FC, useState} from "react";
import {Button, Card, Drawer, Space, DatePicker, Select, Slider, Input} from "antd";
import {FilterOutlined, CloseOutlined, EnvironmentOutlined} from "@ant-design/icons";
import {DESIGN_TOKENS} from "@/shared/const";

const { RangePicker } = DatePicker;

export const FilterEvent: FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<Button
				icon={<FilterOutlined />}
				onClick={() => setIsOpen(true)}
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px'
				}}
			>
				Фильтр
			</Button>

			<Drawer
				title="Фильтры"
				placement="bottom"
				onClose={handleClose}
				open={isOpen}
				height="75vh"
				closeIcon={<CloseOutlined />}
				styles={{
					header: {
						borderBottom: `1px solid ${DESIGN_TOKENS.PRIMARY}`,
						padding: '16px'
					},
					body: {
						padding: '16px'
					}
				}}
			>
				<Space direction="vertical" size="middle" style={{ width: '100%' }}>
					<Card size="small" title="Категория">
						<Select
							mode="multiple"
							style={{ width: '100%' }}
							placeholder="Выберите категории"
							options={[
								{ value: 'tech', label: 'Технологии' },
								{ value: 'business', label: 'Бизнес' },
								{ value: 'art', label: 'Искусство' },
								{ value: 'sport', label: 'Спорт' },
							]}
						/>
					</Card>

					<Card size="small" title="Местоположение">
						<Input
							placeholder="Введите город или адрес"
							prefix={<EnvironmentOutlined />}
							allowClear
						/>
					</Card>

					<Card size="small" title="Дата проведения">
						<Space>
							<Button type="primary">Сегодня</Button>
							<Button>Завтра</Button>
							<DatePicker />
						</Space>
					</Card>

					<Card size="small" title="Цена">
						<Slider
							range
							defaultValue={[0, 5000]}
							min={0}
							max={50000}
							step={1000}
							marks={{
								0: '0₽',
								25000: '25000₽',
								50000: '50000₽'
							}}
						/>
					</Card>

					<Button type="primary" block size="large">
						Применить фильтры
					</Button>
				</Space>
			</Drawer>
		</>
	);
};
