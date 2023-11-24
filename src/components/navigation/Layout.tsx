// ShoppingLayout.js
import React, { useContext, useEffect } from "react";
import Sidebar from "./SideNav";
import AppContext from "../../store/AppContext";
import { useSession } from "../../session";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const { isLoggedIn } = useContext(AppContext).state.loggedIn;
  const isLoggedIn = true;
  const { login } = useSession();
  useEffect(() => {
    if (!isLoggedIn) {
    }
  }, []);

  return (
    <>
      <div className="flex ">
        <div className="flex shadow-mg bg-slate-200 text-slate-700 ">
          {isLoggedIn && <Sidebar />}
        </div>
        <main
          className={`flex w-full min-h-screen overflow-y: scroll ${
            isLoggedIn ? "m-10" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
