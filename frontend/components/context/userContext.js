"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// Custom hook for accessing user data
export default function useUser() {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  return user;
}
