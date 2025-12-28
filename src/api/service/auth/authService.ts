import api from '../../api';
import type { UserDTO } from '../../types/user/userType';

export interface LoginRequest {
  emailAddress: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  username: string;
}

export interface LoginResponde {
  token: string;
  user: UserDTO;
}

export const authService = {
  async register(data: RegisterRequest): Promise<LoginResponde> {
    const response = await api.post<LoginResponde>('/auth/register', data);
    return response.data;
  },

  async login(data: LoginRequest): Promise<LoginResponde> {
    const response = await api.post<LoginResponde>('/auth/login', data);
    return response.data;
  },
};
