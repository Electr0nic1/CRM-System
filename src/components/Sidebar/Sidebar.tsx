import React from 'react'
import { Link } from 'react-router'
import { Typography, Menu } from 'antd'

import styles from './sidebar.module.scss'

const { Title } = Typography

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <Title level={2}>Sidebar</Title>
      <Menu mode="inline" className={styles.sidebarMenu}>
        <Menu.Item key="todo">
          <Link to="/">Todo List Page</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link to="/profile">Profile Page</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Sidebar
