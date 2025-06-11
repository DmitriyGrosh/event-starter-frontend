'use client';

import React, {FC} from "react";
import {Button, Card, Drawer, Space, DatePicker, Select, Slider, Input, AutoComplete, Spin} from "antd";
import {FilterOutlined, EnvironmentOutlined, ClearOutlined} from "@ant-design/icons";
import {DESIGN_TOKENS} from "@/shared/const";
import dayjs from 'dayjs';
import {Filters} from "@/entities/events";
import {useFilterEvent} from "../model";

const { RangePicker } = DatePicker;

interface FilterEventProps {
	filter: Filters;
	onFilterChange: (filter: Filters) => void;
}

export const FilterEvent: FC<FilterEventProps> = ({ filter, onFilterChange }) => {
	const {
		isOpen,
		setIsOpen,
		searchValue,
		tempFilters,
		filteredOptions,
		tagOptions,
		isLoadingTags,
		isToday,
		isTomorrow,
		handleClose,
		handleApplyFilters,
		handleClearFilters,
		handleTagsChange,
		handleLocationChange,
		handleLocationSelect,
		handleDateChange,
		handlePriceChange,
		handleTodayClick,
		handleTomorrowClick
	} = useFilterEvent(filter, onFilterChange);

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
						<Spin spinning={isLoadingTags}>
							<Select
								mode="multiple"
								style={{ width: '100%' }}
								placeholder="Выберите категории"
								value={tempFilters.tags}
								onChange={handleTagsChange}
								options={tagOptions}
								loading={isLoadingTags}
							/>
						</Spin>
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
