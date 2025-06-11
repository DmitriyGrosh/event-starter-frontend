import { useState, useEffect } from 'react';
import { eventService, Event } from '@/shared/api/events';
import { Filters, DEFAULT_FILTER } from '../lib';

export const useEvents = (initialPage: number = 1, limit: number = 10) => {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [page, setPage] = useState(initialPage);
	const [hasMore, setHasMore] = useState(true);
	const [search, setSearch] = useState('');
	const [filters, setFilters] = useState<Filters>(DEFAULT_FILTER);

	const fetchEvents = async (pageNum: number) => {
		try {
			setLoading(true);
			const response = await eventService.getEvents({
				page: pageNum,
				limit,
				sortBy: 'dateStart',
				order: 'desc',
				search: search || undefined,
				fromDate: filters.fromDate || undefined,
				toDate: filters.toDate || undefined,
				tags: filters.tags.length > 0 ? filters.tags : undefined,
				location: filters.location || undefined,
				minPrice: filters.minPrice || undefined,
				maxPrice: filters.maxPrice || undefined
			});

			if (pageNum === 1) {
				setEvents(response.events);
			} else {
				setEvents(prev => [...prev, ...response.events]);
			}

			setHasMore(pageNum < response.pagination.pageCount);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err : new Error('Failed to fetch events'));
		} finally {
			setLoading(false);
		}
	};

	// Effect for search changes
	useEffect(() => {
		setPage(1);
		fetchEvents(1);
	}, [search]);

	// Effect for filter changes
	useEffect(() => {
		setPage(1);
		fetchEvents(1);
	}, [filters]);

	// Effect for pagination
	useEffect(() => {
		if (page > 1) {
			fetchEvents(page);
		}
	}, [page]);

	const loadMore = () => {
		if (!loading && hasMore) {
			setPage(prev => prev + 1);
		}
	};

	const updateFilters = (newFilters: Partial<Filters>) => {
		setFilters(prev => ({ ...prev, ...newFilters }));
	};

	const clearSearch = () => {
		setSearch('');
	};

	return {
		events,
		loading,
		error,
		hasMore,
		loadMore,
		// Search related
		search,
		setSearch,
		clearSearch,
		// Filters related
		filters,
		updateFilters,
	};
};