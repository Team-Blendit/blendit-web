// src/lib/types/blending.ts

import { Position, Experience } from './profile';

export interface CreateBlendingRequest {
  title: string;
  content: string;
  position: Position;
  capacity: number;
  region: string;
  openChattingUrl?: string;
  schedule: string; // ISO 8601 형식: "2026-01-30T18:18:44.923Z"
  autoApproval: boolean;
  keywordUuidList: string[];
}

export interface UpdateBlendingRequest {
  title: string;
  content: string;
  position: Position;
  keywordUuidList: string[];
  capacity: number;
  region: string;
  openChattingUrl?: string;
  schedule: string;
  autoApproval: boolean;
}

export type BlendingUserGrade = 'HOST' | 'MEMBER';
export type JoinStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type BlendingStatus = 'RECRUITING' | 'RECRUITMENT_CLOSED' | 'COMPLETED' | 'CANCELLED';

export interface BlendingParticipant {
  uuid: string;
  nickname: string;
  position: Position;
  experience: Experience;
  province: string;
  district: string;
  keywords: string[];
  blendingUserGrade: BlendingUserGrade;
  joinStatus: JoinStatus;
  profileImageUrl?: string;
}

export interface BlendingDetail {
  id: number;
  uuid: string;
  blendingParticipant: BlendingParticipant[];
  title: string;
  content: string;
  position: Position;
  keywords: string[];
  capacity: number;
  region: string;
  status: BlendingStatus;
  openChattingUrl?: string;
  schedule: string;
  autoApproval: boolean;
  bookmarkCount: number;
  createdDate: string;
  lastModifiedDate: string;
  isBookmarked: boolean;
  isHost: boolean;
  currentUserJoinStatus: JoinStatus;
}

export interface SearchedBlending {
  blendingUuid: string;
  title: string;
  hostNickname: string;
  hostExperience: Experience;
  region: string;
  blendingStatus: BlendingStatus;
  position: Position;
  capacity: number;
  currentUserCount: number;
  keywords: string[];
  isBookmark: boolean;
  isRecommended: boolean;
}

export interface CreatedBlending {
  blendingUuid: string;
  title: string;
  position: Position;
  keywords: string[];
  region: string;
  currentUserCount: number;
  schedule: string;
  openChattingUrl?: string;
  blendingStatus: BlendingStatus;
  useFlag: boolean;
}

export interface AppliedBlending {
  blendingUuid: string;
  title: string;
  position: Position;
  keywords: string[];
  region: string;
  currentUserCount: number;
  schedule: string;
  openChattingUrl?: string;
  joinStatus: JoinStatus;
  useFlag: boolean;
}