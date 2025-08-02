import React from "react";
import { Outlet } from "react-router";

import Sidebar from "../../components/Sidebar/Sidebar.tsx";

const AppLayout: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default AppLayout;