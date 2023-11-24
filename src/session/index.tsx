import React, { createContext, useContext, useState, useEffect } from "react";
import { UserLoggedIn } from "../store/type";

interface User {
  username: string;
  token: string;
  tokenExpiry: number;
}

interface SessionContextValue {
  user: UserLoggedIn | null;
  login: (user: UserLoggedIn) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserLoggedIn | null>(null);

  useEffect(() => {
    // Check if the user is already logged in from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: UserLoggedIn = JSON.parse(storedUser);
      if (parsedUser.expiresIn > Date.now()) {
        setUser(parsedUser);
      } else {
        // Token has expired, clear local storage
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (user: UserLoggedIn) => {
    // Save user details to local storage
    //const newUser: UserLoggedIn = { ...user };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    // Remove user details from local storage
    localStorage.removeItem("user");
    setUser(null);
  };

  const contextValue: SessionContextValue = {
    user,
    login,
    logout,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
