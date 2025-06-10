'use client'

import React, {FC} from "react";
import {Flex, Input} from "antd";
import {DESIGN_TOKENS} from "@/shared/const";
import {SearchOutlined} from "@ant-design/icons";
import {useAtom} from "@reatom/npm-react";
import {searchAtom} from "../model/eventsModel";

export const SearchEvent: FC = () => {
	const [search, setSearch] = useAtom(searchAtom);

	return (
		<Input 
			style={{ color: 'white' }} 
			variant="borderless" 
			size="large" 
			placeholder="OpenConf" 
			prefix={<SearchOutlined style={{ color: "white", fontSize: 24 }} />}
			value={search}
			onChange={(e) => setSearch(e.target.value)}
		/>
	);
};
