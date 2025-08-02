import React, { useEffect } from 'react';
import {
  Form as RouterForm,
  Link,
  useNavigation,
  useSubmit,
  useActionData
} from 'react-router';
import {Form, Button, Input, Typography, Row, Col, message} from 'antd';

import { usernameRules, loginRules, passwordRules, confirmPasswordRules, emailRules, phoneNumberRules } from '../../helpers/validationRules.ts';


type FieldType = {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
  confirmPassword: string;
};

const {Title} = Typography

const SignUpForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm<FieldType>()
  const navigation = useNavigation();
  const submit = useSubmit();
  const actionData = useActionData();

  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    if (actionData && actionData.success === false) {
      messageApi.open({
        type: 'error',
        content: actionData.message
      })
    } else if (actionData && actionData.success === true) {
      messageApi.open({
        type: 'success',
        content: actionData.message,
        duration: 10
      })

      form.resetFields();
    }
  }, [actionData, messageApi]);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    form.validateFields().then((values) => {
      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (value === undefined || value === null) continue;
        formData.append(key, value as string);
      }

      submit(formData, { method: 'post', action: '/auth/signup' });
    })
  }

  return (
    <>
      <RouterForm method="post" className='form' onSubmit={handleSubmit}>
        {contextHolder}
        <Title level={2}>Registration</Title>
        <Form component={false} form={form} validateTrigger="onSubmit">
          <Col>
            <Form.Item<FieldType> name='username' label="Username" rules={usernameRules}>
              <Input/>
            </Form.Item>
            <Form.Item<FieldType> name='login' label="Login" rules={loginRules}>
              <Input/>
            </Form.Item>
            <Form.Item<FieldType> name='password' label="Password" rules={passwordRules}>
              <Input.Password/>
            </Form.Item>
            <Form.Item<FieldType> name='confirmPassword' label="Confirm Password" dependencies={['password']} rules={confirmPasswordRules}>
              <Input.Password/>
            </Form.Item>
            <Form.Item<FieldType> name='email' label="Email" rules={emailRules}>
              <Input/>
            </Form.Item>
            <Form.Item<FieldType> name='phoneNumber' label="Phone" rules={phoneNumberRules}>
              <Input addonBefore="+"/>
            </Form.Item>
            <div className='actions'>
              <Row>
                <Col span={12}>
                  <Button type='link' block>
                    <Link to='/auth/signin'>Login</Link>
                  </Button>
                </Col>
                <Col span={12}>
                  <Button type='primary' block disabled={isSubmitting} htmlType="submit">
                    {isSubmitting ? 'Submitting...' : 'Save'}
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Form>
      </RouterForm>
    </>
  );
}

export default SignUpForm;