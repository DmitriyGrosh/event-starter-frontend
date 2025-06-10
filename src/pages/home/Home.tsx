'use client';

import React from 'react';
import {CardEvent, FilterEvent, SearchEvent} from "@/entities/events";
import {Flex} from "antd";
import {DESIGN_TOKENS} from "@/shared/const";
import {events} from "@/entities/events/model/eventsData";

const Home = () => {
  return (
    <Flex vertical>
      <Flex gap={4} align="center" style={{ background: DESIGN_TOKENS.PRIMARY, padding: "0 16px 16px 16px" }}>
        <SearchEvent />
        <FilterEvent />
      </Flex>
      <Flex vertical style={{ padding: 4 }} gap={8}>
        {events.map((event) => (
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
