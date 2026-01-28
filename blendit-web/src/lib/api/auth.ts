// src/lib/api/auth.ts
import axios from 'axios';
import { LoginResponse } from '@/lib/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authAPI = {
  // 카카오 로그인
  kakaoLogin: async (code: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(
      `${API_BASE_URL}/auth/oidc/kakao`,
      { code },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
    );
    return response.data;
  },
};