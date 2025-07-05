import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Typography } from 'antd'

const { Title } = Typography

const ProfilePage: React.FC =() => {
  return (
    <>
      <Sidebar />
      <Title>Привет!!!</Title>
    </>
  )
}

export default ProfilePage
