import React, { useEffect, useState } from 'react'
import { Typography, Flex, message, Button } from 'antd'

import { getProfile, logout } from '../../api/api.ts'
import type { Profile } from '../../types/index.ts'
import { useForceLogout } from '../../hooks/useForceLogout.ts'

const { Title } = Typography

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const forceLogout = useForceLogout()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile()
        setProfile(response)
      } catch (error) {
        console.error(error)
        messageApi.open({
          type: 'error',
          content: 'Failed to fetch profile. Please try again.',
        })

        forceLogout()
      }
    }

    fetchProfile()
  }, [messageApi])


  const handleLogout = async () => {
    await logout()
    forceLogout()
  }

  return (
    <>
      {contextHolder}
      <Title level={1}>Привет!!!</Title>
      <Flex vertical>
        <Title level={3}>Это страница профиля</Title>
        <Flex justify="space-between">
          <Title level={4}>Username</Title>
          <Typography.Text>{profile?.username}</Typography.Text>
        </Flex>
        <Flex justify="space-between">
          <Title level={4}>Email</Title>
          <Typography.Text>{profile?.email}</Typography.Text>
        </Flex>
        <Flex justify="space-between">
          <Title level={4}>Phone</Title>
          <Typography.Text>{profile?.phoneNumber}</Typography.Text>
        </Flex>
        <Button danger onClick={handleLogout}>Logout</Button>
      </Flex>
    </>
  )
}

export default ProfilePage
