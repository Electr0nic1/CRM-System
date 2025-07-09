import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Menu } from 'antd'

const { Title } = Typography

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <Title level={2}>Sidebar</Title>
      <Menu mode="inline" className="sidebar-menu">
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
