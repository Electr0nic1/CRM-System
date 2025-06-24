import { Link } from 'react-router-dom'
import { Typography, Menu } from 'antd'

const { Title } = Typography

function Sidebar() {
  return (
    <div className="sidebar">
      <Title level={2}>Sidebar</Title>
      <Menu mode="inline" className="sidebar-menu">
        <Menu.Item key="1">
          <Link to="/">Todo List Page</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/profile">Profile Page</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Sidebar
