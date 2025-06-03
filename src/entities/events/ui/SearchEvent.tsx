'use client'

import React, {FC} from "react";
import {Flex, Input} from "antd";
import {DESIGN_TOKENS} from "@/shared/const";
import {SearchOutlined} from "@ant-design/icons";

export const SearchEvent: FC = () => {
	return (
		<Input style={{ color: 'white' }} variant="borderless" size="large" placeholder="OpenConf" prefix={<SearchOutlined style={{ color: "white", fontSize: 24 }} />} />
	);
};
