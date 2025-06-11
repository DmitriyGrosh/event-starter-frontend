'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from './auth';

interface AuthGuardProps {
	children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (!pathname) return;

		const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
		const isProtectedPage = pathname.startsWith('/profile') ||
			pathname.startsWith('/calendar') ||
			pathname.startsWith('/notifications');

		const isLoggedIn = isAuthenticated();

		// If trying to access auth pages while logged in, redirect to profile
		if (isAuthPage && isLoggedIn) {
			router.push('/profile');
		}

		// If trying to access protected pages without being logged in, redirect to login
		if (isProtectedPage && !isLoggedIn) {
			router.push('/login');
		}
	}, [pathname, router]);

	return <>{children}</>;
}