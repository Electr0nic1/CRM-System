import React, { useEffect, useState } from 'react'
import { Typography, Flex, message, Button } from 'antd'

import type { Profile } from '../../types'
import { getProfile, logout } from '../../api/api'

const { Title } = Typography

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile()
        setProfile(response)
      } catch (error) {
        messageApi.open({
          type: 'error',
          content: 'Failed to fetch profile. Please try again.',
        })
      }
    }

    fetchProfile()
  }, [])

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
        <Button danger onClick={() => logout()}>Logout</Button>
      </Flex>
    </>
  )
}

export default ProfilePage
