// ShoppingLayout.js
import React, { useContext, useEffect } from "react";
import Sidebar from "./SideNav";
import AppContext from "../../store/AppContext";
import { useSession } from "../../session";
import { useLocation } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const { user } = useSession();
  const isLoggedIn = user ? user.isLoggedIn : false;
  const isLandingScreen = pathname === "/";
  const shouldShowSidebar = !isLandingScreen && isLoggedIn;
  return (
    <>
      <div className="flex ">
        <div className="flex shadow-mg bg-slate-200 text-slate-700 ">
          {shouldShowSidebar && <Sidebar />}
        </div>
        <main
          className={`flex w-full min-h-screen overflow-y: scroll ${
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
