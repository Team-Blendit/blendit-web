// src/lib/api/profile.ts
import { apiClient } from '@/lib/api';
import { UserProfile, UpdateProfileRequest } from '@/lib/types/profile';

interface ApiResponse<T> {
  result: string;
  data: T;
}

export const profileAPI = {
  // 내 프로필 조회
  getMyProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get<ApiResponse<UserProfile>>('/user/profile/me');
    return response.data.data;
  },

  // 프로필 수정
  updateProfile: async (data: UpdateProfileRequest): Promise<void> => {
    await apiClient.put<ApiResponse<void>>('/user/profile', data);
  },
};
