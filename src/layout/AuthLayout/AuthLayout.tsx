import React from "react";
import { Outlet } from "react-router";
import { Row, Col } from "antd";

import bg from "../../../public/auth-bg.png"

const AuthLayout: React.FC = () => {
  return (
    <>
      <Row className="auth-layout">
        <Col span={14}>
          <img src={bg} alt="auth-bg" className="auth-bg"/>
        </Col>
        <Col span={8} offset={2}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
}

export default AuthLayout;