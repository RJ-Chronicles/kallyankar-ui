import React, { createContext, useContext, useState, useEffect } from "react";
import { UserLoggedIn } from "../store/type";

interface SessionContextValue {
  user: UserLoggedIn | null;
  userLoginHandler: (user: UserLoggedIn) => void;
  userLogoutHandler: () => void;
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
    console.log("CHECK IF USER ALREADY LOGGED IN!");
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    if (storedUser) {
      const parsedUser: UserLoggedIn = JSON.parse(storedUser);

      if (parsedUser.expiresIn > Math.floor(Date.now() / 1000)) {
        setUser(parsedUser);
      } else {
        // Token has expired, clear local storage
        console.log("INSIDE THE ELSE STATMENT: REMOVED USER VALUE");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const userLoginHandler = (userInfo: UserLoggedIn) => {
    //Save user details to local storage
    //const newUser: UserLoggedIn = { ...user };
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
    console.log(userInfo);
  };

  const userLogoutHandler = () => {
    // Remove user details from local storage
    localStorage.removeItem("user");
    setUser(null);
  };

  const contextValue: SessionContextValue = {
    user,
    userLoginHandler,
    userLogoutHandler,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
