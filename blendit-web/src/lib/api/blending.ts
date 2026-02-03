// src/lib/api/blending.ts

import { apiClient } from '@/lib/api';
import { CreateBlendingRequest, UpdateBlendingRequest, BlendingDetail, SearchedBlending, CreatedBlending, AppliedBlending, BlendingHistory } from '@/lib/types/blending';
import { PageableResponse } from '../types/profile';

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

  // 블렌딩 참여 승인
  approveParticipation: async (blendingUuid: string, participantUuid: string): Promise<void> => {
    await apiClient.patch<ApiResponse<void>>(
      `/blending/${blendingUuid}/participation/${participantUuid}/approve`
    );
  },

  // 블렌딩 참여 거부
  rejectParticipation: async (blendingUuid: string, participantUuid: string): Promise<void> => {
    await apiClient.patch<ApiResponse<void>>(
      `/blending/${blendingUuid}/participation/${participantUuid}/reject`
    );
  },

  // 블렌딩 검색
  searchBlendings: async (
    position: string | undefined,
    keywords: string[],
    region: string[],
    isRecruiting: boolean,
    isBookmark: boolean,
    query: string,
    page: number,
    size: number,
    sort: string[]
  ) : Promise<PageableResponse<SearchedBlending>> => {
    const params: Record<string, unknown> = {
      page,
      size,
    };

    if (position) params.position = position;
    if (keywords.length > 0) params.keywords = keywords;
    if (region.length > 0) params.region = region;
    if (isRecruiting) params.isRecruiting = isRecruiting;
    if (isBookmark) params.isBookmark = isBookmark;
    if (query) params.query = query;
    if (sort.length > 0) params.sort = sort;

    const response = await apiClient.get<ApiResponse<PageableResponse<SearchedBlending>>>(
      '/blending/query',
      { params }
    );
    return response.data.data;
  },

  // 내가 생성한 블렌딩 목록 조회
  getMyCreatedBlendings: async (
    page: number = 0,
    size: number = 5,
    sort: string[] = ['createdDate,DESC']
  ): Promise<PageableResponse<CreatedBlending>> => {
    const response = await apiClient.get<ApiResponse<PageableResponse<CreatedBlending>>>(
      '/blending/query/my/created',
      { params: { page, size, sort } }
    );
    return response.data.data;
  },

  // 내가 신청한 블렌딩 목록 조회
  getMyAppliedBlendings: async (
    page: number = 0,
    size: number = 5,
    sort: string[] = ['createdDate,DESC']
  ): Promise<PageableResponse<AppliedBlending>> => {
    const response = await apiClient.get<ApiResponse<PageableResponse<AppliedBlending>>>(
      '/blending/query/my/applied',
      { params: { page, size, sort } }
    );
    return response.data.data;
  },

  getMyBlendingHistory: async (
    page: number = 0,
    size: number = 5,
    sort: string[] = ['createdDate,DESC']
  ): Promise<PageableResponse<BlendingHistory>> => {
    const response = await apiClient.get<ApiResponse<PageableResponse<BlendingHistory>>>(
      '/blending/query/my/history',
      { params: { page, size, sort } }
    );
    return response.data.data;
  },

  addBookmark: async (blendingUuid: string): Promise<void> => {
    await apiClient.post<ApiResponse<void>>(`/blending/${blendingUuid}/bookmark`);
  },
  
  removeBookmark: async (blendingUuid: string): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`/blending/${blendingUuid}/bookmark`);
  },

  cancelParticipation: async (blendingUuid: string): Promise<void> => {
    await apiClient.patch<ApiResponse<void>>(`/blending/${blendingUuid}/participation`);
  },

  deleteBlending: async (blendingUuid: string): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`/blending/${blendingUuid}`);
  }
};