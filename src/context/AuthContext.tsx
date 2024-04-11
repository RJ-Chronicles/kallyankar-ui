import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogoutUser } from "../backend/user";
import useAppContext from "../hooks/useAppContext";
import { User } from "../store/type";

const userDefaultValue: User = {
  createdBy: "",
  email: "",
  last_name: "",
  name: "",
  role: "",
};

type AuthContextProps = {
  isLoggedIn: boolean;
  user: User;
  userLoginHandler: (token: string, expirationTime: any, user: User) => void;
  userLogoutHandler: () => void;
};

const AuthContext = React.createContext<AuthContextProps>({
  isLoggedIn: false,
  user: userDefaultValue,
  userLoginHandler: () => {},
  userLogoutHandler: () => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(userDefaultValue);
  const [isLoggedIn, setLoggeIn] = useState<boolean>(false);
  const { dispatch } = useAppContext();
  const [remainingTime, setRemainingTime] = useState<any>();
  const navigate = useNavigate();
  const loginHandler = useCallback(
    (token: string, expirationTime: any, user: User) => {
      setUser(user);
      setLoggeIn(true);
      updateLocalStorage(token, expirationTime, user);
      const timeLeft =
        new Date(expirationTime).getTime() - new Date().getTime();
      setRemainingTime(timeLeft);
    },
    []
  );

  const logoutHandler = useCallback(async () => {
    const jwtToken = localStorage.getItem("token") || "";
    const userEmail =
      user.email ||
      JSON.parse(localStorage.getItem("user") || "{}").email ||
      "";
    try {
      dispatch({
        type: "TOGGLE_SNACKBAR",
        payload: {
          isOpen: true,
          message: "You have been log out",
          severity: "success",
        },
      });
      await postLogoutUser(jwtToken, userEmail);
    } catch (err) {}

    clearLocalStorage();
    setLoggeIn(false);
    setUser(userDefaultValue);
    navigate("/");
  }, []);

  useEffect(() => {
    const { storedToken, storedExpirationTime, storedUser } = getStoredData();
    console.log({ storedToken, storedExpirationTime, storedUser });
    if (storedToken && storedExpirationTime && storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setLoggeIn(true);
      const remainingTime =
        new Date(storedExpirationTime).getTime() - new Date().getTime();
      if (remainingTime < 60000) {
        logoutHandler();
      }
    }
  }, [logoutHandler]);

  const updateLocalStorage = (
    token: string,
    expirationTime: any,
    user: User
  ) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
  };

  const getStoredData = () => {
    const storedToken = localStorage.getItem("token") || "";
    const storedExpirationTime = localStorage.getItem("expirationTime") || "";
    const storedUser = localStorage.getItem("user") || "";
    return { storedToken, storedExpirationTime, storedUser };
  };

  const contextValue: AuthContextProps = {
    isLoggedIn: isLoggedIn,
    user,
    userLoginHandler: loginHandler,
    userLogoutHandler: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuthContext = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return auth;
};
