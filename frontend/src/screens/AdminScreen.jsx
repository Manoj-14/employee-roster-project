import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNav from "../components/nav-bar/AdminNav";
import { useSelector } from "react-redux";
import { message } from "antd";

const AdminScreen = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    } else if (!user.role.includes("ADMIN")) {
      navigate("/login");
      message.error("You Don't have access to that page");
    }
  }, []);
  return (
    <div>
      <AdminNav />
      <Outlet />
    </div>
  );
};

export default AdminScreen;
