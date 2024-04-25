import React from "react";
import NavBar from "../components/nav-bar/NavBar";
import { Outlet } from "react-router-dom";

const AdminScreen = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AdminScreen;
