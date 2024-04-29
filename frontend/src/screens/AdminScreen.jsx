import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../components/nav-bar/AdminNav";

const AdminScreen = () => {
  return (
    <div>
      <AdminNav />
      <Outlet />
    </div>
  );
};

export default AdminScreen;
