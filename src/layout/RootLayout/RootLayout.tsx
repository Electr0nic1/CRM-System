import React from "react";
import { Outlet} from "react-router";

const RootLayout: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
}

export default RootLayout;