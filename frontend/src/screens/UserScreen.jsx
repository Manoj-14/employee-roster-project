import React, { useEffect } from "react";
import NavBar from "../components/nav-bar/NavBar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllUser } from "../api";

const UserScreen = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default UserScreen;
