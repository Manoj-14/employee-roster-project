import React, { useEffect, useState } from "react";
import WeekRow from "./WeekRow";
import { getAllUser } from "../../api";

const WeekCalander = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchusers = async () => {
      const response = await getAllUser();
      setEmployees(response.data);
    };
    fetchusers();
  }, []);
  return <WeekRow />;
};

export default WeekCalander;
