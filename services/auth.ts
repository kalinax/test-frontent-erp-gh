interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  permissions: {
    roles: string[];
  };
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

const USER_KEY = 'user_data';
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_KEY = process.env.NEXT_PUBLIC_BACKEND_API_V1_KEY;

export const auth = {
  setTokens(accessToken: string, refreshToken: string): void {
    try {
      document.cookie = `access_token=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
      document.cookie = `refresh_token=${refreshToken}; path=/; max-age=2592000; secure; samesite=strict`;
    } catch (error) {
      console.error('Error storing tokens:', error);
    }
  },

  getTokens(): AuthTokens | null {
    try {
      const cookies = document.cookie.split(';');
      const accessToken = cookies.find(c => c.trim().startsWith('access_token='))?.split('=')[1];
      const refreshToken = cookies.find(c => c.trim().startsWith('refresh_token='))?.split('=')[1];

      if (!accessToken || !refreshToken) return null;

      return {
        accessToken,
        refreshToken
      };
    } catch (error) {
      console.error('Error retrieving tokens:', error);
      return null;
    }
  },

  setUser(user: User | null): void {
    try {
      if (user === null) {
        localStorage.removeItem(USER_KEY);
      } else {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  },

  getUser(): User | null {
    try {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  },

  clearAuth(): void {
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    this.setUser(null);
  },

  isAuthenticated(): boolean {
    return !!this.getTokens()?.accessToken;
  },

  getAccessToken() {
    if (typeof window !== 'undefined') {
      return document.cookie
        .split(';')
        .find(c => c.trim().startsWith('access_token='))
        ?.split('=')[1];
    }
    return null;
  },

  getRefreshToken() {
    if (typeof window !== 'undefined') {
      return document.cookie
        .split(';')
        .find(c => c.trim().startsWith('refresh_token='))
        ?.split('=')[1];
    }
    return null;
  },

  handleLoginSuccess(response: {
    access_token: string;
    refresh_token: string;
    user: User;
  }): void {
    this.setTokens(response.access_token, response.refresh_token);
    this.setUser(response.user);
  },

  async refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${BASE_URL}api/v1/user/login/refresh_token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': refreshToken || '',
          'api_key': API_KEY || '',
        },
      });

      if (!response.ok) {
        this.clearTokens();
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      document.cookie = `access_token=${data.access_token}; path=/`;
      return data.access_token;
    } catch (error) {
      this.clearTokens();
      throw error;
    }
  },

  clearTokens() {
    if (typeof window !== 'undefined') {
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  },
}; 