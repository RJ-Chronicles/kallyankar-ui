// ShoppingLayout.js
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./SideNav";

import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const isLandingScreen = pathname === "/";
  const auth = useAuthContext();
  const { isLoggedIn } = auth;
  const shouldShowSidebar = !isLandingScreen && isLoggedIn;

  return (
    <>
      <div className={`${shouldShowSidebar ? "flex" : ""}`}>
        {shouldShowSidebar && (
          <div className="flex shadow-mg bg-slate-200 text-slate-700 ">
            <Sidebar />
          </div>
        )}
        <main
          className={`${
            shouldShowSidebar ? "flex" : ""
          } w-full min-h-screen overflow-y: scroll ${
            shouldShowSidebar ? "pl-5" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
