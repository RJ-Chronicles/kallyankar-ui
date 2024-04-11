import { useContext } from "react";
import AuthContext from "./AuthContext";

export const useAuthContext = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return auth;
};
