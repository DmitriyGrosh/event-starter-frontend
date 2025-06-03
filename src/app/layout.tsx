'use client'

import React from "react";
import {ConfigProvider} from 'antd';
import {AppLayout} from "@/widgets/app-layout";

import 'antd/dist/reset.css';
import "./styles/root.css";
import {DESIGN_TOKENS} from "@/shared/const";

export default function RootLayout({
		children,
	}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
		<body style={{ margin: 0, padding: 0 }}>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: DESIGN_TOKENS.PRIMARY,
					}
				}}
			>
				<AppLayout>{children}</AppLayout>
			</ConfigProvider>
		</body>
		</html>
	)
}
