import { EditOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card } from "antd";
// import { employees } from "../resources/data/employee";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import { getAllUser } from "../api";

const Employee = ({ employee }) => {
  const getShift = (shift) => {
    switch (shift) {
      case "GENERAL":
        return "General shift";
      case "MORNING":
        return "Morning Shift";
      case "EVENING":
        return "Evening shift";
      default:
        break;
    }
  };
  return (
    <Card className="m-2" style={{ width: 300 }}>
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={employee.name}
        description={employee.empId}
      />
      <p className="alert alert-info p-1 m-2 text-center text-bold">
        {getShift(employee.shift)}
      </p>
    </Card>
  );
};

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getAllUser();
      setEmployees(response.data);
    };
    fetchEmployees();
    console.log(employees);
  }, []);

  return (
    <div className="dashboard">
      <div className=" d-flex flex-column justify-content-center align-items-center">
        <div>
          <h3>Hii Admin Good Morning</h3>
          <p>Look at the Todays roster of employees</p>
        </div>
        <div className="employees d-flex flex-wrap">
          {employees.map((employee) => (
            <Employee employee={employee} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
