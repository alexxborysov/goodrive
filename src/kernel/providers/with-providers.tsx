'use client';

import type { ReactNode } from 'react';
import { WithStore } from './with-store';
import { ThemeProvider } from './with-theme';
import { InitApplication } from './with-initialize';
import { WithToaster } from './with-toaster';

export function WithProviders(props: { children: ReactNode }) {
  return (
    <InitApplication>
      <WithToaster>
        <WithStore>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {props.children}
          </ThemeProvider>
        </WithStore>
      </WithToaster>
    </InitApplication>
  );
}
