'use client';

import React, {FC, useState, useMemo, useEffect} from "react";
import {Button, Card, Drawer, Space, DatePicker, Select, Slider, Input, AutoComplete} from "antd";
import {FilterOutlined, EnvironmentOutlined, ClearOutlined} from "@ant-design/icons";
import {DESIGN_TOKENS} from "@/shared/const";
import {Filters} from "../lib/types";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {events} from "@/entities/events";

const { RangePicker } = DatePicker;

const DEFAULT_FILTER: Filters = {
	minPrice: null,
	maxPrice: null,
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
	const [searchValue, setSearchValue] = useState('');
	const [tempFilters, setTempFilters] = useState<Filters>(filter);

	useEffect(() => {
		setTempFilters(filter);
	}, [filter]);

	// Get unique locations from events
	const locationOptions = useMemo(() => {
		const uniqueLocations = Array.from(new Set(events.map(event => event.location)));
		return uniqueLocations.map(location => ({
			value: location,
			label: location
		}));
	}, []);

	const handleClose = () => {
		setTempFilters(filter);
		setSearchValue(filter.location || '');
		setIsOpen(false);
	};

	const handleApplyFilters = () => {
		onFilterChange(tempFilters);
		setIsOpen(false);
	};

	const handleClearFilters = () => {
		setTempFilters(DEFAULT_FILTER);
		setSearchValue('');
		onFilterChange(DEFAULT_FILTER);
	};

	const handleTagsChange = (tags: string[]) => {
		setTempFilters(prev => ({ ...prev, tags }));
	};

	const handleLocationChange = (value: string) => {
		setSearchValue(value);
		setTempFilters(prev => ({ ...prev, location: value }));
	};

	const handleLocationSelect = (value: string) => {
		setSearchValue(value);
		setTempFilters(prev => ({ ...prev, location: value }));
	};

	const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
		if (dates?.[0] && dates?.[1]) {
			setTempFilters(prev => ({
				...prev,
				fromDate: dates[0]?.toISOString() ?? null,
				toDate: dates[1]?.toISOString() ?? null
			}));
		} else {
			setTempFilters(prev => ({
				...prev,
				fromDate: null,
				toDate: null
			}));
		}
	};

	const handlePriceChange = (value: [number, number]) => {
		setTempFilters(prev => ({ 
			...prev, 
			minPrice: value[0],
			maxPrice: value[1]
		}));
	};

	const handleTodayClick = () => {
		const today = dayjs();
		setTempFilters(prev => ({
			...prev,
			fromDate: today.startOf('day').toISOString(),
			toDate: today.endOf('day').toISOString()
		}));
	};

	const handleTomorrowClick = () => {
		const tomorrow = dayjs().add(1, 'day');
		setTempFilters(prev => ({
			...prev,
			fromDate: tomorrow.startOf('day').toISOString(),
			toDate: tomorrow.endOf('day').toISOString()
		}));
	};

	const isToday = tempFilters.fromDate && dayjs(tempFilters.fromDate).isSame(dayjs(), 'day');
	const isTomorrow = tempFilters.fromDate && dayjs(tempFilters.fromDate).isSame(dayjs().add(1, 'day'), 'day');

	const filteredOptions = useMemo(() => {
		return locationOptions.filter(option => 
			option.value.toLowerCase().includes(searchValue.toLowerCase())
		);
	}, [locationOptions, searchValue]);

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
							value={tempFilters.tags}
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
							options={filteredOptions}
							value={searchValue}
							onChange={handleLocationChange}
							onSelect={handleLocationSelect}
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
								value={tempFilters.fromDate && tempFilters.toDate ? [dayjs(tempFilters.fromDate), dayjs(tempFilters.toDate)] : null}
							/>
						</Space>
					</Card>

					<Card size="small" title="Цена">
						<Slider
							range
							min={0}
							max={10000}
							value={[
								tempFilters.minPrice ?? 0,
								tempFilters.maxPrice ?? 10000
							]}
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
