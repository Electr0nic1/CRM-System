import React from 'react'
import { Link, useRouteError } from 'react-router'
import { Typography, Button } from 'antd';

const { Title } = Typography;

const Error: React.FC = () => {
  const error = useRouteError() as { status: number; statusText: string; message: string } | null;

  return (
    <>
      <Title level={1}>Something went wrong</Title>
      <Title level={2}>{error?.status} - {error?.statusText}</Title>
      <Button type='link' block><Link to="/auth/signin">Log in</Link></Button>
    </>
  )
}

export default Error
