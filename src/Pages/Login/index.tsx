import React, { useState } from 'react';
import qs from 'qs';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './login.css'; 
import { Redirect } from 'react-router-dom';
import request from '../../request';

const LoginForm : React.FC = () => {
  const [isLogin, setIsLogin] = useState(false)
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    request.post(
      '/api/login',
      qs.stringify({password: values.password}),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    ).then(res => {
      const data: boolean = res.data;
      if (data) {
        setIsLogin(true);
      } else {
        message.error('登录失败');
      }
    })
  };

  return (
    isLogin ?
    (<Redirect to="/home"/>) :
    (<div className="login-page">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    </div>)
  );
};

export default LoginForm