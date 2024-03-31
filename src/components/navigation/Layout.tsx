// ShoppingLayout.js
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./SideNav";

import { useLocation } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  // const { user } = useSession();
  // const isLoggedIn = user ? user.isLoggedIn : false;
  //const { auth } = useAppContext().state;
  // const isLoggedIn = auth?.isLoggedIn ?? false;
  const isLandingScreen = pathname === "/";
  const [isLoggedIn, setLogin] = useState(false);
  const shouldShowSidebar = !isLandingScreen && isLoggedIn;

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setLogin(true);
    }
  }, []);
  return (
    <>
      <div className="flex ">
        <div className="flex shadow-mg bg-slate-200 text-slate-700 ">
          {shouldShowSidebar && <Sidebar />}
        </div>
        <main
          className={`${
            shouldShowSidebar ? "flex" : ""
          } w-full min-h-screen overflow-y: scroll ${
            shouldShowSidebar ? "pl-10" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
