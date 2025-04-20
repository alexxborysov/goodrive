'use client';

import { useEffect, type ReactNode } from 'react';
import { initializeApplication } from '../app-init';

export function InitApplication(props: { children: ReactNode }) {
  useEffect(initializeApplication, []);
  return props.children;
}
