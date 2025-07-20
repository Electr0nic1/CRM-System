import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router";

const AppLayout: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default AppLayout;