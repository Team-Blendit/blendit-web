// src/lib/api/blending.ts

import { apiClient } from '@/lib/api';
import { CreateBlendingRequest, UpdateBlendingRequest, BlendingDetail } from '@/lib/types/blending';

interface ApiResponse<T> {
  result: string;
  data: T;
}

export const blendingAPI = {
  // 블렌딩 생성
  createBlending: async (data: CreateBlendingRequest): Promise<void> => {
    await apiClient.post<ApiResponse<void>>('/blending', data);
  },

  // 블렌딩 상세 조회
  getBlendingDetail: async (blendingUuid: string): Promise<BlendingDetail> => {
    const response = await apiClient.get<ApiResponse<BlendingDetail>>(
      `/blending/${blendingUuid}`
    );
    return response.data.data;
  },

  // 블렌딩 수정
  updateBlending: async (blendingUuid: string, data: UpdateBlendingRequest): Promise<void> => {
    await apiClient.patch<ApiResponse<void>>(`/blending/${blendingUuid}`, data);
  },

  // 블렌딩 참여 신청
  applyBlending: async (blendingUuid: string, message: string): Promise<void> => {
    await apiClient.post<ApiResponse<void>>(`/blending/${blendingUuid}/participation`, {
      message,
    });
  },
};
