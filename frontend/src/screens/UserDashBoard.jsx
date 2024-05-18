import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, message, Select, Tooltip } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import "../resources/css/input.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, updateShift } from "../slices/userSlice";
import {
  changeCurrentShift,
  getRosterOfUser,
  updateEmployeeShift,
} from "../api";
import moment from "moment";
import { setRoster } from "../slices/rosterSlice";
import { convertArraysToObjects } from "../resources/data/dataFormatting";

const UserDashBoard = () => {
  const [enableUpdate, setEnableUpdate] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { roster } = useSelector((state) => state.roster);
  const [shift, setShift] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchRosterOfUser = async () => {
    const roster = await getRosterOfUser(
      user.id,
      moment().month() + 1,
      moment().year()
    );
    dispatch(setRoster(roster));
    setShift(getShiftByString(roster[moment().format("DD-MM-YYYY")]));
    return roster;
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShift(getShiftByString(roster[moment().format("DD-MM-YYYY")]));
    fetchRosterOfUser();
    console.log(
      "shift:" + getShiftByString(roster[moment().format("DD-MM-YYYY")])
    );
  }, []);

  const handleShiftChange = (value) => {
    console.log(value);
    setShift(value);
    setEnableUpdate(true);
  };

  const handleUpdateShift = async (e) => {
    e.preventDefault();
    // let updatedUser = { ...user };
    // updatedUser.shift = shift;
    console.log(roster);
    console.log(
      "updating:",
      getShiftByString(roster[moment().format("DD-MM-YYYY")])
    );
    const data = await changeCurrentShift(
      user.id,
      getShiftByString(roster[moment().format("DD-MM-YYYY")]),
      shift
    );
    let updatedRoster = data;
    setShift(getShiftByString(data[moment().format("DD-MM-YYYY")]));
    // console.log(dumRes);
    // const response = await updateEmployeeShift(updatedUser);
    if (updatedRoster) {
      dispatch(setRoster(data));
      message.success("Shift Updated !");
    } else {
      message.error("Unable to update shift");
    }
    setEnableUpdate(false);
  };

  const getShiftByString = (shift) => {
    console.log(shift);
    switch (shift) {
      case "generalShift":
        return "GENERAL";
      case "eveningShift":
        return "EVENING";
      case "morningShift":
        return "MORNING";
      case "weekOffs":
        return "WEEKOFF";
      default:
        return "NOTASSIGNED";
    }
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
                <Option
                  value="WEEKOFF"
                  className="shift-option"
                  style={{ display: "none" }}
                >
                  Week off
                </Option>
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
