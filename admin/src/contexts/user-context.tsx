'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import type { User } from '@/types/user';
import { logger } from '@/lib/default-logger';
import axios from 'axios';

// CONTEXT SETUP
interface AdminInfo {
  name: string;
  email: string;
  image: string;
  role: string;
}

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  adminInfo: AdminInfo | null | undefined;
  checkSession: () => void;
  updateUser: (updatedUser: Partial<User>) => Promise<void>;
}

export const UserContext = createContext<UserContextValue | undefined>(undefined);

const fetchAdminInfo = async (email: string): Promise<AdminInfo | null> => {
  try {
    const { data } = await axios.get(`/api/admins?email=${email}`);
    return data;
  } catch (error) {
    logger.error('Error fetching admin info:', error);
    return null;
  }
};

// PROVIDER COMPONENT
export function UserProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const { data: session, status, update } = useSession();
  const [error, setError] = useState<string | null>(null);

  // Fetch admin info with TanStack Query
  const { data: adminInfo, isLoading } = useQuery({
    queryKey: ['admin', session?.user?.email],
    queryFn: () => fetchAdminInfo(session?.user?.email as string),
    enabled: !!session?.user?.email,
  });

  // Set user data based on session
  const user: User | null = session
    ? {
      email: session.user?.email || '',
      name: session.user?.name || '',
      image: session.user?.image || '',
      role: (session.user as any)?.role || 'admin',
    }
    : null;

  const checkSession = () => {
    setError(status === 'unauthenticated' ? 'No session found' : null);
  };

  // Update user session
  const updateUser = async (updatedUser: Partial<User>) => {
    try {
      const updatedSession = await update({
        ...session,
        user: {
          ...session?.user,
          ...updatedUser,
        },
      });

      if (!updatedSession) throw new Error('Failed to update session');
      setError(null);
    } catch (error) {
      logger.error('Failed to update user session:', error);
      setError('Failed to update session');
    }
  };

  // Check session when status changes
  useEffect(() => {
    checkSession();
  }, [status, session]);

  return (
    <UserContext.Provider value={{ user, error, isLoading, adminInfo, checkSession, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
