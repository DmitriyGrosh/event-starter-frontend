'use client';

import React from 'react';
import {CardEvent, FilterEvent, SearchEvent} from "@/entities/events";
import {Flex} from "antd";
import {DESIGN_TOKENS} from "@/shared/const";

const Home = () => {
  return (
    <Flex vertical>
      <Flex gap={4} align="center" style={{ background: DESIGN_TOKENS.PRIMARY, padding: "0 16px 16px 16px" }}>
        <SearchEvent />
        <FilterEvent />
      </Flex>
      <Flex vertical style={{ padding: 4 }} gap={8}>
        <CardEvent title="Elevate: The Conference for Professional Growth" location="Los Angeles" price={300} imageUrl="https://optim.tildacdn.com/tild6138-3133-4732-a336-316166613961/-/cover/600x600/center/center/-/format/webp/photo_2016-09-15_16-.jpg.webp" />
        <CardEvent title="Elevate: The Conference for Professional Growth" location="Los Angeles" price={300} imageUrl="https://optim.tildacdn.com/tild6138-3133-4732-a336-316166613961/-/cover/600x600/center/center/-/format/webp/photo_2016-09-15_16-.jpg.webp" />
        <CardEvent title="Elevate: The Conference for Professional Growth" location="Los Angeles" price={300} imageUrl="https://optim.tildacdn.com/tild6138-3133-4732-a336-316166613961/-/cover/600x600/center/center/-/format/webp/photo_2016-09-15_16-.jpg.webp" />
        <CardEvent title="Elevate: The Conference for Professional Growth" location="Los Angeles" price={300} imageUrl="https://optim.tildacdn.com/tild6138-3133-4732-a336-316166613961/-/cover/600x600/center/center/-/format/webp/photo_2016-09-15_16-.jpg.webp" />
      </Flex>
    </Flex>
  );
}

export default Home;
