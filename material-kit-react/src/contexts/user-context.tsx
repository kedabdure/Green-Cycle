'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import type { User } from '@/types/user';
import { logger } from '@/lib/default-logger';
import axios from 'axios';

// UserContextValue defines the shape of context
export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  adminInfo: AdminInfo | null;
  checkSession: () => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => Promise<void>;
}

interface AdminInfo {
  name: string;
  email: string;
  phone: string;
  image: string;
  city: string;
  country: string;
  role: string;
}

// CONTEXT SETUP
export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

// USERPROVIDERPROPS DEFINES THE CHILDREN PROP
export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const { data: session, status, update } = useSession();
  const [adminInfo, setAdminInfo] = React.useState<AdminInfo | null>(null);
  const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  // FETCH ADMIN INFO FROM AN API
  const fetchAdminInfo = async (email: string) => {
    try {
      const res = await axios.get(`/api/admins?email=${email}`);
      if (res.status === 200) {
        setAdminInfo(res.data);
      } else {
        throw new Error('Failed to fetch admins info');
      }
    } catch (error) {
      logger.error('Error fetching admins info:', error);
    }
  };

  // CHECK SESSION AND SET USER DATA
  const checkSession = async (): Promise<void> => {
    if (status === 'loading') {
      setState((prev) => ({ ...prev, isLoading: true }));
      return;
    }

    if (session) {
      const userData: User = {
        email: session.user?.email || '',
        name: session.user?.name || '',
        image: session.user?.image || '',
        role: (session.user as any)?.role || 'admin',
      };

      setState({ user: userData, error: null, isLoading: false });
    } else {
      setState({ user: null, error: 'No session found', isLoading: false });
    }
  };

  // UPDATE SESSION WITH NEW USER DATA
  const updateUser = async (updatedUser: Partial<User>): Promise<void> => {
    try {
      const updatedSession = await update({
        ...session,
        user: {
          ...session?.user,
          ...updatedUser,
        },
      });

      if (updatedSession) {
        setState((prev) => ({
          ...prev,
          user: prev.user ? { ...prev.user, ...updatedUser } : null,
          error: null,
        }));
      } else {
        throw new Error('Failed to update session');
      }
    } catch (error) {
      logger.error('Failed to update user session:', error);
      setState((prev) => ({ ...prev, error: 'Failed to update session', isLoading: false }));
    }
  };

  // FETCH ADMIN INFO AND CHECK SESSION WHEN STATUS CHANGES
  React.useEffect(() => {
    checkSession();
    if (session && session?.user?.email) {
      fetchAdminInfo(session.user.email);
    }
  }, [status, session]);

  return (
    <UserContext.Provider value={{ ...state, checkSession, updateUser, adminInfo }}>
      {children}
    </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;
