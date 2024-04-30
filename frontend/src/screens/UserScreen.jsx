import React, { useEffect } from "react";
import NavBar from "../components/nav-bar/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";

const UserScreen = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    } else if (!user.role.includes("USER")) {
      navigate("/login");
      message.error("You Don't have access to that page");
    }
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default UserScreen;
