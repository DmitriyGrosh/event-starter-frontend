import React from "react";
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';

export default function RootLayout({
		children,
	}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
		<body>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#00b96b',
					},
				}}
			>
				{children}
			</ConfigProvider>
		</body>
		</html>
	)
}
