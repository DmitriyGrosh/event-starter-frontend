'use client';

import React, { useRef, useCallback } from 'react';
import { CardEvent, SearchEvent, Filters, useEvents } from "@/entities/events";
import { Flex, Spin, Alert, Typography } from "antd";
import { DESIGN_TOKENS } from "@/shared/const";
import {FilterEvent} from "@/features/filter-events";

const { Text } = Typography;

const Home = () => {
  const { 
    events, 
    loading, 
    error, 
    hasMore, 
    loadMore,
    search,
    setSearch,
    filters,
    updateFilters,
  } = useEvents(1, 10);

  const observer = useRef<IntersectionObserver>();

  const lastEventElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  if (error) {
    return (
      <Flex justify="center" align="center" style={{ height: '100vh' }}>
        <Alert
          message="Error"
          description={error.message}
          type="error"
          showIcon
        />
      </Flex>
    );
  }

  const handleFilterChange = (newFilter: Filters) => {
    updateFilters(newFilter);
  };

  return (
    <Flex vertical>
      <Flex gap={4} align="center" style={{ background: DESIGN_TOKENS.PRIMARY, padding: "0 16px 16px 16px" }}>
        <SearchEvent search={search} onSearchChange={setSearch} />
        <FilterEvent
          filter={filters} 
          onFilterChange={handleFilterChange} 
        />
      </Flex>
      <Flex vertical style={{ padding: 4 }} gap={8}>
        {events.map((event, index) => {
          const isLastElement = index === events.length - 1;

          return (
            <div
              key={event.id}
              ref={isLastElement ? lastEventElementRef : undefined}
            >
              <CardEvent 
                id={event.id.toString()}
                title={event.title}
                location={event.location}
                tickets={event.tickets}
                description={event.description}
                imageUrl={event.imageUrl || undefined}
              />
            </div>
          );
        })}
        {loading && (
          <Flex justify="center" style={{ padding: '20px 0' }}>
            <Spin size="large" />
          </Flex>
        )}
        {!loading && !hasMore && events.length > 0 && (
          <Flex justify="center" style={{ padding: '20px 0' }}>
            <Text type="secondary">Больше событий нет</Text>
          </Flex>
        )}
        {!loading && events.length === 0 && (
          <Flex justify="center" style={{ padding: '20px 0' }}>
            <Text type="secondary">События не найдены</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default Home;
