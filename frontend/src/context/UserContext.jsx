import { useAuth, useUser } from "@clerk/clerk-react";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const { getToken } = useAuth(); // Clerk's getToken function
  const { user: clerkUser } = useUser(); // Clerk's user object

  useEffect(() => {
    const fetchUserData = async () => {
      if (clerkUser) {
        setUser(clerkUser); // Set user from Clerk
        const fetchedToken = await getToken(); // Fetch token from Clerk
        setToken(fetchedToken);
      }
    };

    fetchUserData();
  }, [clerkUser, getToken]); // Re-run when Clerk user or token changes

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
