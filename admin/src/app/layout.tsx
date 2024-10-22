'use client';

import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
  session: any;
}

export default function Layout({ children, session }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
          <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
              <UserProvider>
                <ThemeProvider>{children}</ThemeProvider>
              </UserProvider>
            </SessionProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
