import { Button, Card, Checkbox, Form, Input, Modal } from "antd";
import EmployeeImage from "../resources/images/emplooyee.svg";
import React, { useEffect, useState } from "react";
import { userLogin } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

const SelectAccountTypeModal = ({ accountType, handleRedirection }) => {
  return (
    <Card
      style={{ width: 300, cursor: "pointer" }}
      className="d-inline-block border-2 border-primary m-2"
      onClick={() => handleRedirection(accountType)}
    >
      <p>{accountType}</p>
    </Card>
  );
};

const LoginScreen = () => {
  const [isAccountTypeOpen, setIsAccountTypeOpen] = useState(false);
  const [accountTypes, setAccountTypes] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setAccountTypes(user.role);
      setIsAccountTypeOpen(true);
    }
  }, []);

  const openAccountTypeModel = () => {
    setIsAccountTypeOpen(true);
  };

  const closeAccountTypeModel = () => {
    setIsAccountTypeOpen(false);
  };

  const handleAccountTypeRedirection = (accountType) => {
    switch (accountType) {
      case "EMPLOYEE":
        navigate("/user/dashboard");
        break;
      case "ADMIN":
        navigate("/admin/dashboard");
        break;
      default:
        console.log(accountType);
        break;
    }
    closeAccountTypeModel();
  };

  const onFinish = async (values) => {
    const response = await userLogin(values.email, values.password);
    if (response) {
      console.log(response.role);
      setAccountTypes((p) => response.data.role);
      dispatch(setUser(response.data));
      if (accountTypes.length > 1) {
        openAccountTypeModel();
      } else {
        handleAccountTypeRedirection(accountTypes[0]);
      }
    }
    console.log(accountTypes);
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
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                type: "email",
              },
            ]}
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
      <Modal
        title="Select Account Type"
        open={isAccountTypeOpen}
        footer={null}
        onCancel={closeAccountTypeModel}
      >
        <div className="d-flex ">
          {user &&
            accountTypes.map((type) => {
              console.log(type);
              return (
                <SelectAccountTypeModal
                  key={`${type}-1`}
                  accountType={type}
                  handleRedirection={handleAccountTypeRedirection}
                />
              );
            })}
        </div>
      </Modal>
    </div>
  );
};

export default LoginScreen;
