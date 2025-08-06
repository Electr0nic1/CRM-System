import React from "react";
import { Outlet } from "react-router";
import { Row, Col } from "antd";

import styles from "./authLayout.module.scss"
import bg from "../../../public/auth-bg.png"

const AuthLayout: React.FC = () => {
  return (
    <>
      <Row className={styles.authLayout}>
        <Col span={14}>
          <img src={bg} alt="auth-bg" className={styles.authBg}/>
        </Col>
        <Col span={8} offset={2}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
}

export default AuthLayout;