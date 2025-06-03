'use client'

import React from "react";
import {ConfigProvider} from 'antd';
import {AppLayout} from "@/widgets/app-layout";
import { reatomContext } from '@reatom/npm-react'
import {DESIGN_TOKENS} from "@/shared/const";
import {createCtx} from "@reatom/framework";

import 'antd/dist/reset.css';
import "./styles/root.css";

const ctx = createCtx();

export default function RootLayout({
		children,
	}: {
	children: React.ReactNode
}) {

	return (
		<html lang="en">
		<body style={{ margin: 0, padding: 0 }}>
		<reatomContext.Provider value={ctx}>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: DESIGN_TOKENS.PRIMARY,
					}
				}}
			>
				<AppLayout>{children}</AppLayout>
			</ConfigProvider>
		</reatomContext.Provider>
		</body>
		</html>
	)
}
