import { message, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import React from "react";
import { employees } from "../resources/data/employee";

const Tabel = () => {
  const data = [];
  const handleChangeShift = (e) => {
    message.info("Please save roster,you have changed the shift");
  };

  const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };
  // const handleRowClick = (record, rowIndex) => {
  //   return {
  //     onClick: (event) => {
  //       console.log("Row index", rowIndex);
  //       console.log("Column index", event.target.cellIndex);
  //     },
  //   };
  // };

  const generatedateColumn = () => {
    const column = {
      width: 150,
    };
    const days = getDaysInMonth(4, 2024);
    const columns = [];
    days.forEach((day, i) => {
      let getDate = day.getDate() + "/" + day.getMonth();
      let newColumn = JSON.parse(JSON.stringify(column));
      newColumn.title = getDate;
      newColumn.dataIndex = getDate;
      newColumn.key = i + 1 + "";
      columns.push(newColumn);
      employees.forEach((employees) => {});
    });
    return columns;
  };

  let dummyColumns = generatedateColumn();
  dummyColumns.unshift({
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  });

  const createSelect = (shift, dateIndex) => {
    const day = new Date();
    let getDate = day.getDate() + "/" + (day.getMonth() + 1);
    const data = {
      [dateIndex]: (
        <Select
          defaultValue={shift}
          onChange={(e) => handleChangeShift(e)}
          style={{ width: 120 }}
          name="shift"
          disabled={dateIndex !== getDate}
        >
          <Option value="gs">General Shift</Option>
          <Option value="ms">Morning Shift</Option>
          <Option value="es">Evening Shift</Option>
        </Select>
      ),
    };
    return data;
  };

  const formatResponseData = (employees) => {
    const formatedData = [];
    const employeeData = JSON.parse(JSON.stringify(employees));
    const days = getDaysInMonth(4, 2024);
    employeeData.forEach((employee, i) => {
      days.forEach((day) => {
        let getDate = day.getDate() + "/" + day.getMonth();
        let selectElem = createSelect(employee.shift, getDate);
        employee = { ...employee, ...selectElem };
      });
      employee.key = i + 1;
      formatedData.push({
        ...employee,
      });
    });
    return formatedData;
  };

  const dummyData = formatResponseData(employees);

  return (
    <Table
      columns={dummyColumns}
      dataSource={dummyData}
      scroll={{
        x: "max-content",
      }}
    />
  );
};

export default Tabel;
