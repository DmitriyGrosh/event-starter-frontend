'use client'

import React, {FC} from "react";
import {Flex, Input} from "antd";
import {DESIGN_TOKENS} from "@/shared/const";
import {SearchOutlined} from "@ant-design/icons";

interface SearchEventProps {
	search: string;
	onSearchChange: (value: string) => void;
}

export const SearchEvent: FC<SearchEventProps> = ({ search, onSearchChange }) => {
	return (
		<Input 
			style={{ color: 'white' }} 
			variant="borderless" 
			size="large" 
			placeholder="OpenConf" 
			prefix={<SearchOutlined style={{ color: "white", fontSize: 24 }} />}
			value={search}
			onChange={(e) => onSearchChange(e.target.value)}
		/>
	);
};
