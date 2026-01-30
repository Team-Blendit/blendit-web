// src/lib/api/profile.ts
import { apiClient } from '@/lib/api';
import { UserProfile, UpdateProfileRequest, BookmarkedUser, PageableResponse, UserSearchRequest, SearchedUser, OtherUserProfile } from '@/lib/types/profile';

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

  // 북마크한 유저 목록 조회
  getBookmarkedUsers: async (page: number, size: number): Promise<PageableResponse<BookmarkedUser>> => {
    const response = await apiClient.get<ApiResponse<PageableResponse<BookmarkedUser>>>(
      '/user/bookmark/list',
      {
        params: {
          page,
          size,
        },
      }
    );
    return response.data.data;
  },

  // 유저 검색
  searchUsers: async (
    request: UserSearchRequest,
    page: number,
    size: number
  ): Promise<PageableResponse<SearchedUser>> => {
    const response = await apiClient.get<ApiResponse<PageableResponse<SearchedUser>>>(
      '/user/search',
      {
        params: {
          ...request,
          page,
          size,
        },
      }
    );
    return response.data.data;
  },

  // 유저 북마크 등록
  addBookmark: async (userUuid: string): Promise<void> => {
    await apiClient.post<ApiResponse<void>>(`/user/bookmark/${userUuid}`);
  },

  // 유저 북마크 삭제
  removeBookmark: async (userUuid: string): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`/user/bookmark/${userUuid}`);
  },

  // 다른 유저 프로필 조회
  getUserProfile: async (userUuid: string): Promise<OtherUserProfile> => {
    const response = await apiClient.get<ApiResponse<OtherUserProfile>>(`/user/profile/${userUuid}`);
    return response.data.data;
  },
};
