'use client';

import React, {FC, useState, useMemo} from "react";
import {Button, Card, Drawer, Space, DatePicker, Select, Slider, Input, AutoComplete} from "antd";
import {FilterOutlined, CloseOutlined, EnvironmentOutlined, ClearOutlined} from "@ant-design/icons";
import {DESIGN_TOKENS} from "@/shared/const";
import {useAtom} from "@reatom/npm-react";
import {filterAtom} from "../model/eventsModel";
import {EventsFilter} from "@/entities/events";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {events} from "../model/eventsData";

const { RangePicker } = DatePicker;

const DEFAULT_FILTER: EventsFilter = {
	priceRange: [0, 100],
	location: '',
	tags: [],
	startedAt: null,
	endedAt: null
};

export const FilterEvent: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [filter, setFilter] = useAtom(filterAtom);

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
		setFilter(DEFAULT_FILTER);
	};

	const handleTagsChange = (tags: string[]) => {
		setFilter({ ...filter, tags });
	};

	const handleLocationChange = (value: string) => {
		setFilter({ ...filter, location: value });
	};

	const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
		if (dates && dates[0] && dates[1]) {
			setFilter({
				...filter,
				startedAt: dates[0].toDate(),
				endedAt: dates[1].toDate()
			});
		} else {
			setFilter({
				...filter,
				startedAt: null,
				endedAt: null
			});
		}
	};

	const handlePriceChange = (value: number[]) => {
		setFilter({ ...filter, priceRange: [value[0], value[1]] });
	};

	const handleTodayClick = () => {
		const today = dayjs();
		setFilter({
			...filter,
			startedAt: today.startOf('day').toDate(),
			endedAt: today.endOf('day').toDate()
		});
	};

	const handleTomorrowClick = () => {
		const tomorrow = dayjs().add(1, 'day');
		setFilter({
			...filter,
			startedAt: tomorrow.startOf('day').toDate(),
			endedAt: tomorrow.endOf('day').toDate()
		});
	};

	const isToday = filter.startedAt && dayjs(filter.startedAt).isSame(dayjs(), 'day');
	const isTomorrow = filter.startedAt && dayjs(filter.startedAt).isSame(dayjs().add(1, 'day'), 'day');

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
								value={filter.startedAt && filter.endedAt ? [dayjs(filter.startedAt), dayjs(filter.endedAt)] : null}
							/>
						</Space>
					</Card>

					<Card size="small" title="Цена">
						<Slider
							range
							value={filter.priceRange}
							onChange={handlePriceChange}
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

					<Space style={{ width: '100%', justifyContent: 'space-between' }}>
						<Button 
							icon={<ClearOutlined />}
							onClick={handleClearFilters}
						>
							Сбросить фильтры
						</Button>
						<Button type="primary" size="large" onClick={handleApplyFilters}>
							Применить фильтры
						</Button>
					</Space>
				</Space>
			</Drawer>
		</>
	);
};
