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

  // 프로필 수정 (multipart/form-data)
  updateProfile: async (data: UpdateProfileRequest): Promise<void> => {
    const formData = new FormData();

    formData.append('nickname', data.nickname);
    formData.append('description', data.description);
    formData.append('experience', data.experience);
    formData.append('position', data.position);
    formData.append('province', data.province);
    formData.append('district', data.district);
    formData.append('email', data.email);

    data.keywordUuidList.forEach((uuid) => {
      formData.append('keywordUuidList', uuid);
    });

    if (data.affiliation) {
      formData.append('affiliation', data.affiliation);
    }
    if (data.skills) {
      data.skills.forEach((skill, index) => {
        formData.append(`skills[${index}].title`, skill.title);
        formData.append(`skills[${index}].orderNum`, String(skill.orderNum));
      });
    }
    if (data.links) {
      data.links.forEach((link, index) => {
        formData.append(`links[${index}].title`, link.title);
        formData.append(`links[${index}].url`, link.url);
        formData.append(`links[${index}].orderNum`, String(link.orderNum));
      });
    }
    if (data.profileImage) {
      formData.append('profileImage', data.profileImage);
    }

    await apiClient.put<ApiResponse<void>>('/user/profile', formData, {
      headers: {
        'Content-Type': undefined,
      },
    });
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
