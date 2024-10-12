'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import type { User } from '@/types/user';
import { logger } from '@/lib/default-logger';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const { data: session, status } = useSession();

  const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      if (status === 'loading') {
        setState((prev) => ({ ...prev, isLoading: true }));
        return;
      }

      if (session) {
        const userData: User = {
          email: session.user?.email || '',
          name: session.user?.name || '',
          image: session.user?.image || '',
        };

        setState((prev) => ({ ...prev, user: userData, error: null, isLoading: false }));
      } else {
        setState((prev) => ({ ...prev, user: null, error: 'No session found', isLoading: false }));
      }
    } catch (err) {
      logger.error(err);
      setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
    }
  }, [session, status]);

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      logger.error(err);
    });
  }, [status]);

  return <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
