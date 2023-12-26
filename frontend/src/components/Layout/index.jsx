import React from "react";
import Sidebar from "../Sidebar/index.jsx";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row">

      <Sidebar />

      <div className="flex flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
