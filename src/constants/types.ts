// src/types.ts
// Shared type definitions used throughout MishOS.

import { ReactNode } from 'react';

export interface AppDefinition {
  key: string;
  name: string;
  shortcutIcon: string;
  component: React.ComponentType<any>;
  widthRatio: number;
  heightRatio: number;
  bottomLeftText: string;
}
