import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, message, Select, Tooltip } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import "../resources/css/input.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, updateShift } from "../slices/userSlice";
import { updateEmployeeShift } from "../api";

const UserDashBoard = () => {
  const [enableUpdate, setEnableUpdate] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [shift, setShift] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShift(user.shift);
  }, []);

  const handleShiftChange = (value) => {
    console.log(value);
    setShift(value);
    setEnableUpdate(true);
  };

  const handleUpdateShift = async (e) => {
    e.preventDefault();
    let updatedUser = { ...user };
    updatedUser.shift = shift;
    const response = await updateEmployeeShift(updatedUser);
    if (response) {
      dispatch(setUser(updatedUser));
      message.success("Shift Updated !");
    } else {
      message.error("Unable to update shift");
    }
    setEnableUpdate(false);
  };

  return (
    <div className="dashboard">
      <div className="d-flex flex-column  justify-content-center align-items-center">
        <h3>Good Morning, John</h3>
        <span>Please Look at your shift today</span>
        <form
          class="prof-article"
          id="profile"
          autocomplete="off"
          onSubmit={(e) => handleUpdateShift(e)}
        >
          <div class="prof-detail">
            <div class="material-textfield">
              <input
                placeholder=" "
                required
                name="name"
                type="text"
                value={user.name}
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
                value={user.email}
                readOnly
              />
              <label>Email</label>
            </div>
            <div class="material-textfield">
              <input
                placeholder=" "
                required
                name="empId"
                type="text"
                value={user.empId}
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
              <Select
                className="mx-2"
                defaultValue={shift}
                value={shift}
                name="shift"
                onChange={handleShiftChange}
              >
                <Option value="GENERAL">General Shift</Option>
                <Option value="MORNING">Morning Shift</Option>
                <Option value="EVENING">Evening Shift</Option>
              </Select>
            </div>
            <div class="material-textfield">
              <Button
                disabled={!enableUpdate}
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
