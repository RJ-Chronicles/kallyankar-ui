// ShoppingLayout.js
import React from "react";
import Sidebar from "./SideNav";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      {false && <Sidebar />}
      <main className="flex">{children}</main>
    </div>
  );
};

export default Layout;
