import React from 'react'
import Sidebar from '@components/Sidebar/Sidebar'
import { Typography } from 'antd'

const { Title } = Typography

function ProfilePage() {
  return (
    <>
      <Sidebar />
      <Title>Привет!!!</Title>
    </>
  )
}

export default ProfilePage
