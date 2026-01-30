// src/lib/types/blending.ts

import { Position } from './profile';

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
