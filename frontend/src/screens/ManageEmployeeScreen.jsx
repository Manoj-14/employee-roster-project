import { Button, Form, Input, Checkbox, Radio, message } from "antd";
import { useState } from "react";
import { AddEmployee } from "../api";

const ManageEmployeeScreen = () => {
  const [empRole, setEmpRole] = useState(["EMPLOYEE"]);
  const roleOptions = ["EMPLOYEE", "ADMIN"];
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleRoleOnchange = (list) => {
    setEmpRole(list);
  };

  const onFinish = async (values) => {
    setLoading((p) => true);
    values.role = empRole;
    console.log(values);
    const response = await AddEmployee(values);
    console.log(response);
    message.success(`${values.name} added Succesfully`);
    form.resetFields();
    setLoading((p) => false);
  };
  const onFinishFailed = (values) => {
    console.log(values);
  };
  return (
    <div className="d-flex justify-content-center align-items-center ">
      <Form
        form={form}
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        rootClassName="p-3"
      >
        <div className="text-center">
          <h2 className="h1">Add Employee</h2>
          <p>Add the employee details correctly</p>
        </div>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input employee name!" }]}
        >
          <Input placeholder="Employee Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input employee email!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Employee Email" />
        </Form.Item>
        <Form.Item
          name="empId"
          rules={[
            {
              required: true,
              message: "Please input employee Id!",
            },
          ]}
        >
          <Input placeholder="Employee Id" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} valuePropName="empRole">
          <label className="lead mx-1">Role:</label>
          <Checkbox.Group
            options={roleOptions}
            value={empRole}
            onChange={handleRoleOnchange}
          ></Checkbox.Group>
        </Form.Item>
        <Form.Item
          name="shift"
          rules={[{ required: true, message: "Please select shift" }]}
        >
          <Radio.Group>
            <Radio.Button className="radio-button" value="GENERAL">
              General shift
            </Radio.Button>
            <Radio.Button className="radio-button" value="MORNING">
              Morning Shift
            </Radio.Button>
            <Radio.Button className="radio-button" value="EVENING">
              Evening Shift
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="weekoff"
          rules={[{ required: true, message: "Please select week off's" }]}
        >
          <Radio.Group>
            <Radio.Button className="radio-button" value="ERISAT">
              FRIDAY/SATURDAY
            </Radio.Button>
            <Radio.Button className="radio-button" value="SUNMON">
              SUNDAY/MONDAY
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Add Employee
          </Button>
        </Form.Item>
      </Form>
      <div></div>
    </div>
  );
};

export default ManageEmployeeScreen;
