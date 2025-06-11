import { useState, useEffect, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {DEFAULT_FILTER, events, Filters} from '@/entities/events';
import { tagsService, Tag } from '@/shared/api/tags';

export const useFilterEvent = (initialFilter: Filters, onFilterChange: (filter: Filters) => void) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [tempFilters, setTempFilters] = useState<Filters>(initialFilter);
    const [tags, setTags] = useState<Tag[]>([]);
    const [isLoadingTags, setIsLoadingTags] = useState(false);

    useEffect(() => {
        setTempFilters(initialFilter);
    }, [initialFilter]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                setIsLoadingTags(true);
                const response = await tagsService.getPopularTags();
                setTags(response);
            } catch (error) {
                console.error('Failed to fetch tags:', error);
            } finally {
                setIsLoadingTags(false);
            }
        };

        fetchTags();
    }, []);

    // Get unique locations from event-details
    const locationOptions = useMemo(() => {
        const uniqueLocations = Array.from(new Set(events.map(event => event.location)));
        return uniqueLocations.map(location => ({
            value: location,
            label: location
        }));
    }, []);

    const tagOptions = useMemo(() => {
        return tags.map(tag => ({
            value: tag.name,
            label: tag.name
        }));
    }, [tags]);

    const handleClose = () => {
        setTempFilters(initialFilter);
        setSearchValue(initialFilter.location || '');
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

    return {
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
    };
}; 