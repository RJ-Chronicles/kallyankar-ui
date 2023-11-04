// ShoppingLayout.js
import React from "react";
import Sidebar from "./SideNav";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      {true && <Sidebar />}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default Layout;
