'use client';

import React, { useState } from 'react';
import {CardEvent, FilterEvent, SearchEvent} from "@/entities/events";
import {Flex} from "antd";
import {DESIGN_TOKENS} from "@/shared/const";
import {events} from "@/entities/events/model/eventsData";
import dayjs from 'dayjs';
import { EventsFilter } from '@/entities/events';

const DEFAULT_FILTER: EventsFilter = {
  priceRange: [0, 100],
  location: '',
  tags: [],
  startedAt: null,
  endedAt: null
};

const Home = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<EventsFilter>(DEFAULT_FILTER);

  const filteredEvents = events.filter(event => {
    // Search filter - match title or description
    const searchLower = search.toLowerCase();
    const searchMatch = search === '' || 
      event.title.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower);

    // Price filter - only apply if range is different from default
    const isDefaultPriceRange = filter.priceRange[0] === 0 && filter.priceRange[1] === 100;
    const priceMatch = isDefaultPriceRange || 
      (event.price >= filter.priceRange[0] && event.price <= filter.priceRange[1]);

    // Date filter - only apply if dates are selected
    const dateMatch = !filter.startedAt || !filter.endedAt || !event.date ? true :
      event.date.isAfter(dayjs(filter.startedAt).startOf('day')) && 
      event.date.isBefore(dayjs(filter.endedAt).endOf('day'));

    // Tags filter - only apply if tags are selected
    const tagsMatch = filter.tags.length === 0 || 
      (event.tags && filter.tags.some(tag => event.tags?.includes(tag)));

    // Location filter - only apply if location is selected
    const locationMatch = !filter.location || 
      event.location.toLowerCase().includes(filter.location.toLowerCase());

    return searchMatch && priceMatch && dateMatch && tagsMatch && locationMatch;
  });

  return (
    <Flex vertical>
      <Flex gap={4} align="center" style={{ background: DESIGN_TOKENS.PRIMARY, padding: "0 16px 16px 16px" }}>
        <SearchEvent search={search} onSearchChange={setSearch} />
        <FilterEvent filter={filter} onFilterChange={setFilter} />
      </Flex>
      <Flex vertical style={{ padding: 4 }} gap={8}>
        {filteredEvents.map((event) => (
          <CardEvent 
            key={event.id}
            id={event.id}
            title={event.title}
            location={event.location}
            price={event.price}
            imageUrl={event.imageUrl}
            description={event.description}
          />
        ))}
      </Flex>
    </Flex>
  );
}

export default Home;
