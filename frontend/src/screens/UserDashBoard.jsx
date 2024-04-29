import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Select, Tooltip } from "antd";
import { Option } from "antd/es/mentions";
import React from "react";
import "../resources/css/input.css";

const UserDashBoard = () => {
  return (
    <div className="dashboard">
      <div className="d-flex flex-column  justify-content-center align-items-center">
        <h3>Good Morning, John</h3>
        <span>Please Look at your shift today</span>
        <form class="prof-article" id="profile" autocomplete="off">
          <div class="prof-detail">
            <div class="material-textfield">
              <input
                placeholder=" "
                required
                name="name"
                type="text"
                value="John"
                readOnly
              />
              <label>Name</label>
            </div>
            <div class="material-textfield">
              <input
                placeholder=" "
                required
                name="email"
                type="email"
                value="manm@gmail.com"
                readOnly
              />
              <label>Email</label>
            </div>
            <div class="material-textfield">
              <input
                placeholder=" "
                required
                name="empId"
                type="number"
                value="6154"
                readOnly
              />
              <label>Employee Id</label>
            </div>
            <div className="my-3">
              <span>
                Shift{" "}
                <Tooltip
                  title="You can change your today's shift"
                  style={{ zIndex: 5, display: "inline" }}
                  color="green"
                >
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>{" "}
                :
              </span>
              <Select className="mx-2" defaultValue="gs" name="shift">
                <Option value="gs">General Shift</Option>
                <Option value="ms">Morning Shift</Option>
                <Option value="es">Evening Shift</Option>
              </Select>
            </div>
            <div class="material-textfield">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDashBoard;
