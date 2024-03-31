// ShoppingLayout.js
import React, { useContext, useEffect } from "react";
import Sidebar from "./SideNav";

import { useLocation } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  // const { user } = useSession();
  // const isLoggedIn = user ? user.isLoggedIn : false;
  const { auth } = useAppContext().state;
  const isLoggedIn = auth?.isLoggedIn;
  const isLandingScreen = pathname === "/";
  const shouldShowSidebar = isLandingScreen && !isLoggedIn;
  return (
    <>
      <div className={``}>
        {shouldShowSidebar && (
          <div className="flex shadow-mg bg-slate-200 text-slate-700 ">
            <Sidebar />
          </div>
        )}
        <main
          className={`${
            shouldShowSidebar ? "flex" : ""
          } w-full min-h-screen overflow-y: scroll ${
            shouldShowSidebar ? "m-10" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
