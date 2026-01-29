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
