'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, User, LoginRequest, RegisterRequest } from '@/shared/api/auth';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '@/shared/const';

interface AuthContextType {
	isAuthenticated: boolean;
	user: User | null;
	login: (data: LoginRequest) => Promise<void>;
	register: (data: RegisterRequest) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const token = localStorage.getItem(AUTH_TOKEN_KEY);
		const storedUser = localStorage.getItem(AUTH_USER_KEY);

		if (token && storedUser) {
			setIsAuthenticated(true);
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = async (data: LoginRequest) => {
		try {
			const response = await authService.login(data);
			localStorage.setItem(AUTH_TOKEN_KEY, response.token);
			localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));
			setIsAuthenticated(true);
			setUser(response.user);
		} catch (error) {
			console.error('Login failed:', error);
			throw error;
		}
	};

	const register = async (data: RegisterRequest) => {
		try {
			const response = await authService.register(data);
			localStorage.setItem(AUTH_TOKEN_KEY, response.token);
			localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));
			setIsAuthenticated(true);
			setUser(response.user);
		} catch (error) {
			console.error('Registration failed:', error);
			throw error;
		}
	};

	const logout = () => {
		localStorage.removeItem(AUTH_TOKEN_KEY);
		localStorage.removeItem(AUTH_USER_KEY);
		setIsAuthenticated(false);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
