// src/lib/types/profile.ts

export type Position = 'ALL' | 'FRONTEND' | 'BACKEND' | 'DESIGN' | 'PM' | 'AI' | 'DATA' | 'SECURITY' | 'MARKETING';
export type Experience = 'NEWBIE' | 'JUNIOR' | 'MIDDLE' | 'SENIOR';

export interface ProfileLink {
  title: string;
  url: string;
  orderNum: number;
}

export interface UserProfile {
  nickname: string;
  profileImage: string;
  position: Position;
  experience: Experience;
  affiliation: string;
  province: string;
  district: string;
  email: string;
  description: string;
  keywordList: string[];
  skills: string[];
  links: ProfileLink[];
}

export interface SkillItem {
  title: string;
  orderNum: number;
}

export interface UpdateProfileRequest {
  nickname: string;
  description?: string;
  experience: Experience;
  position: Position;
  province: string;
  district: string;
  email: string;
  keywordUuidList: string[];
  affiliation?: string;
  skills: SkillItem[];
  links: ProfileLink[];
}

export interface BookmarkedUser {
  userUuid: string;
  nickname: string;
  position: Position;
  experience: Experience;
  province: string;
  district: string;
  keywords: string[];
  profileImageUrl: string;
}

export interface PageableRequest {
  page: number;
  size: number;
  sort?: string[];
}

export interface PageableResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

export interface UserSearchRequest {
  position?: Position;
  keywordUuidList: string[];
  districtList: string[];
  isBookmarked: boolean;
}

export interface SearchedUser {
  userUuid: string;
  nickname: string;
  position: Position;
  experience: Experience;
  province: string;
  district: string;
  keywordList: string[];
  isBookmarked: boolean;
  profileImageUrl: string;
}

export interface OtherUserProfile {
  nickname: string;
  profileImage: string;
  position: Position;
  experience: Experience;
  affiliation: string;
  province: string;
  district: string;
  email: string;
  description: string;
  keywordList: string[];
  skills: string[];
  links: ProfileLink[];
  isBookmarked: boolean;
}
