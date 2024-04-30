import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../slices/userSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate("/login");
  }, []);
  return <div></div>;
};

export default Logout;
