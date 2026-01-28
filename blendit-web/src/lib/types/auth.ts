// src/lib/types/auth.ts
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  uuid: string;
  email: string;
  nickname: string;
  profileImage: string;
  loginType: 'LOCAL' | 'KAKAO' | 'GOOGLE';
}

export interface KakaoLoginRequest {
  code: string;
}