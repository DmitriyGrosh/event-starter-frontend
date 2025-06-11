import { AUTH_TOKEN_KEY, AUTH_HEADER, AUTH_TOKEN_PREFIX } from '@/shared/const';

export const getAuthHeader = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ? { [AUTH_HEADER]: `${AUTH_TOKEN_PREFIX} ${token}` } : {};
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
}; 