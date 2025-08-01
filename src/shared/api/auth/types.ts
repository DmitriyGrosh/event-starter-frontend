export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresIn: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
} 