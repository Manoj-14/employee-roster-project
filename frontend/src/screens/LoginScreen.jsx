import { Button, Checkbox, Form, Input } from "antd";
import EmployeeImage from "../resources/images/emplooyee.svg";
import React from "react";

const LoginScreen = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (values) => {
    console.log(values);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src={EmployeeImage} alt="Login" />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome back</p>
          <p>Login to the Dashboard</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginScreen;
