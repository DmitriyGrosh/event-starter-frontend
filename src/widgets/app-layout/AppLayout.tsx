import {Layout, Menu, Button} from "antd";
import React, {FC, PropsWithChildren, useState} from "react";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	CalendarOutlined,
	BellOutlined,
	LogoutOutlined,
	PlusCircleOutlined
} from "@ant-design/icons";
import {DESIGN_TOKENS} from "@/shared/const";
import { useRouter, usePathname } from 'next/navigation';
import {useAuth} from "@/entities/viewer";

const {Content, Header, Sider} = Layout;

export const AppLayout: FC<PropsWithChildren> = ({children}) => {
	const [collapsed, setCollapsed] = useState(true);
	const router = useRouter();
	const pathname = usePathname();
	const { logout, isAuthenticated } = useAuth();

	const items = [
		{
			key: '/',
			icon: <VideoCameraOutlined/>,
			label: 'Мероприятия',
		},
		...(isAuthenticated ? [{
			key: '/events/create',
			icon: <PlusCircleOutlined />,
			label: 'Создать мероприятие',
		}] : []),
		...(isAuthenticated ? [{
			key: '/profile',
			icon: <UserOutlined/>,
			label: 'Профиль',
		}] : []),
		...(isAuthenticated ? [{
			key: '/calendar',
			icon: <CalendarOutlined/>,
			label: 'Календарь',
		}] : []),
		...(isAuthenticated ? [{
			key: '/notifications',
			icon: <BellOutlined/>,
			label: 'Уведомления',
		}] : []),
		...(isAuthenticated ? [{
			key: 'logout',
			icon: <LogoutOutlined />,
			label: 'Выйти',
			danger: true,
		}] : [{
			key: '/login',
			icon: <UserOutlined />,
			label: 'Войти',
		}]),
	];

	const handleMenuClick = ({ key }: { key: string }) => {
		setCollapsed(true);
		if (key === 'logout') {
			logout();
			router.push('/login');
		} else {
			router.push(key);
		}
	};

	return (
		<Layout style={{minHeight: '100vh'}}>
			{!collapsed && (
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						zIndex: 2,
					}}
					onClick={() => setCollapsed(true)}
				/>
			)}
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				style={{
					position: 'fixed',
					height: '100vh',
					zIndex: 3,
					left: collapsed ? '-100%' : 0,
					transition: 'left 0.2s',
					width: '100% !important',
					maxWidth: '100% !important',
				}}
			>
				<div style={{ padding: '16px' }}>
					<MenuFoldOutlined
						style={{color: "white", fontSize: "24px", cursor: 'pointer'}}
						onClick={() => setCollapsed(true)}
					/>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					selectedKeys={pathname ? [pathname] : []}
					items={items}
					onClick={handleMenuClick}
					style={{
						fontSize: '18px',
					}}
				/>
			</Sider>
			<Layout>
				<Header style={{
					position: 'sticky',
					top: 0,
					zIndex: 1,
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					padding: "0 16px",
					background: DESIGN_TOKENS.PRIMARY
				}}>
					<MenuUnfoldOutlined
						style={{color: "white", fontSize: "24px", cursor: 'pointer'}}
						onClick={() => setCollapsed(false)}
					/>
				</Header>
				<Content>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
}
