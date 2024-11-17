export interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}