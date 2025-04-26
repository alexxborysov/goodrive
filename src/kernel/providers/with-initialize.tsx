'use client';

import { useEffect, type ReactNode } from 'react';
import { initializeApplication } from '../main';

export function InitApplication(props: { children: ReactNode }) {
  useEffect(initializeApplication, []);
  return props.children;
}
