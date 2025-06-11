'use client';

import React, {FC, useState, useMemo} from "react";
import {Button, Card, Drawer, Space, DatePicker, Select, Slider, Input, AutoComplete} from "antd";
import {FilterOutlined, CloseOutlined, EnvironmentOutlined, ClearOutlined} from "@ant-design/icons";
import {DESIGN_TOKENS} from "@/shared/const";
import {Filters} from "../lib/types";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {events} from "../model/eventsData";

const { RangePicker } = DatePicker;

const DEFAULT_FILTER: Filters = {
	priceRange: [0, 100],
	location: '',
	tags: [],
	fromDate: null,
	toDate: null
};

interface FilterEventProps {
	filter: Filters;
	onFilterChange: (filter: Filters) => void;
}

export const FilterEvent: FC<FilterEventProps> = ({ filter, onFilterChange }) => {
	const [isOpen, setIsOpen] = useState(false);

	// Get unique locations from events
	const locationOptions = useMemo(() => {
		const uniqueLocations = Array.from(new Set(events.map(event => event.location)));
		return uniqueLocations.map(location => ({
			value: location,
			label: location
		}));
	}, []);

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleApplyFilters = () => {
		setIsOpen(false);
	};

	const handleClearFilters = () => {
		onFilterChange(DEFAULT_FILTER);
	};

	const handleTagsChange = (tags: string[]) => {
		onFilterChange({ ...filter, tags });
	};

	const handleLocationChange = (value: string) => {
		onFilterChange({ ...filter, location: value });
	};

	const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
		if (dates && dates[0] && dates[1]) {
			onFilterChange({
				...filter,
				fromDate: dates[0].toISOString(),
				toDate: dates[1].toISOString()
			});
		} else {
			onFilterChange({
				...filter,
				fromDate: null,
				toDate: null
			});
		}
	};

	const handlePriceChange = (value: [number, number]) => {
		onFilterChange({ ...filter, priceRange: value });
	};

	const handleTodayClick = () => {
		const today = dayjs();
		onFilterChange({
			...filter,
			fromDate: today.startOf('day').toISOString(),
			toDate: today.endOf('day').toISOString()
		});
	};

	const handleTomorrowClick = () => {
		const tomorrow = dayjs().add(1, 'day');
		onFilterChange({
			...filter,
			fromDate: tomorrow.startOf('day').toISOString(),
			toDate: tomorrow.endOf('day').toISOString()
		});
	};

	const isToday = filter.fromDate && dayjs(filter.fromDate).isSame(dayjs(), 'day');
	const isTomorrow = filter.fromDate && dayjs(filter.fromDate).isSame(dayjs().add(1, 'day'), 'day');

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
							value={filter.tags}
							onChange={handleTagsChange}
							options={[
								{ value: 'tech', label: 'Технологии' },
								{ value: 'business', label: 'Бизнес' },
								{ value: 'art', label: 'Искусство' },
								{ value: 'sport', label: 'Спорт' },
							]}
						/>
					</Card>

					<Card size="small" title="Местоположение">
						<AutoComplete
							style={{ width: '100%' }}
							options={locationOptions}
							value={filter.location}
							onChange={handleLocationChange}
							placeholder="Введите город"
							allowClear
						>
							<Input
								prefix={<EnvironmentOutlined />}
								placeholder="Введите город"
							/>
						</AutoComplete>
					</Card>

					<Card size="small" title="Дата проведения">
						<Space>
							<Button 
								type={isToday ? "primary" : "default"}
								onClick={handleTodayClick}
							>
								Сегодня
							</Button>
							<Button 
								type={isTomorrow ? "primary" : "default"}
								onClick={handleTomorrowClick}
							>
								Завтра
							</Button>
							<RangePicker
								onChange={handleDateChange}
								value={filter.fromDate && filter.toDate ? [dayjs(filter.fromDate), dayjs(filter.toDate)] : null}
							/>
						</Space>
					</Card>

					<Card size="small" title="Цена">
						<Slider
							range
							min={0}
							max={100}
							value={filter.priceRange}
							onChange={(value) => handlePriceChange(value as [number, number])}
						/>
					</Card>

					<Space style={{ width: '100%', justifyContent: 'space-between' }}>
						<Button 
							icon={<ClearOutlined />} 
							onClick={handleClearFilters}
						>
							Очистить фильтры
						</Button>
						<Button type="primary" onClick={handleApplyFilters}>
							Применить фильтры
						</Button>
					</Space>
				</Space>
			</Drawer>
		</>
	);
};
