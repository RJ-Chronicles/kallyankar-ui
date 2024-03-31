import { useState, useEffect } from "react";
import { User } from "../store/type";

type TokenData = {
  token: string | null;
  duration: number;
  user: User | null;
};

type AuthProps = {
  auth: TokenData | null;
  userLoginHandler: (token: string, expirationTime: any, user: User) => void;
};

const useToken = (): AuthProps => {
  const [login, setLogin] = useState(false);
  const [tokenData, setTokenData] = useState<TokenData | null>(() => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationTime = localStorage.getItem("expirationTime");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedExpirationTime && storedUser) {
      const expirationTime = new Date(storedExpirationTime).getTime();
      const currentTime = new Date().getTime();
      const remainingTime = expirationTime - currentTime;

      if (remainingTime > 0) {
        const parsedUser: User = JSON.parse(storedUser);
        return {
          token: storedToken,
          duration: remainingTime,
          user: parsedUser,
        };
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
    return null;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const storedToken = localStorage.getItem("token");
      const storedExpirationTime = localStorage.getItem("expirationTime");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedExpirationTime && storedUser) {
        const expirationTime = new Date(storedExpirationTime).getTime();
        const currentTime = new Date().getTime();
        const remainingTime = expirationTime - currentTime;

        if (remainingTime > 0) {
          const parsedUser: User = JSON.parse(storedUser);
          setTokenData({
            token: storedToken,
            duration: remainingTime,
            user: parsedUser,
          });
          return;
        }
      }

      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("user");
      setTokenData(null);
    }, 60000);

    return () => clearInterval(interval);
  }, [login]);

  const userLoginHandler = (token: string, expirationTime: any, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("user", JSON.stringify(user));
    setLogin((pre) => !pre);
  };

  return { auth: tokenData, userLoginHandler };
};

export default useToken;
