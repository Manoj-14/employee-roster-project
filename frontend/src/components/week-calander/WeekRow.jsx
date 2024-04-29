import { Select } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { employees } from "../../resources/data/employee";
import { formatedData } from "../../resources/data/dataFormatting";
import { type } from "@testing-library/user-event/dist/type";
import "./week-calander.css";
import { Option } from "antd/es/mentions";
import { Form } from "react-bootstrap";

const EmployeeRow = ({ employee, dates }) => {
  const getShift = (shift) => {
    if (shift === "gs" || shift === "es" || shift === "ms") return shift;
    else return "na";
  };

  return (
    <div>
      <span className="data-cell">{employee.name}</span>
      {dates.map((day) => {
        // return (
        //   <Select
        //     defaultValue={employee[day]}
        //     className="data-cell"
        //     style={{ width: 120 }}
        //     name="shift"
        //   >
        //     <Option value="gs">General Shift</Option>
        //     <Option value="ms">Morning Shift</Option>
        //     <Option value="es">Evening Shift</Option>
        //   </Select>
        // );
        // return <span className="data-cell">{employee[day]}</span>;
        return (
          <Form.Select
            className="data-cell"
            value={getShift(employee[day])}
            defaultValue={getShift(employee[day])}
            disabled={getShift(employee[day]) === "na"}
          >
            <option value="gs">General Shift</option>
            <option value="ms">Morning Shift</option>
            <option value="es">Evening Shift</option>
            <option style={{ display: "none" }} value="na">
              Not Assigned
            </option>
          </Form.Select>
        );
      })}
    </div>
  );
};

const WeekRow = ({ employee }) => {
  const getDatesOfWeek = (year, week) => {
    let dates = [];
    let startDate = moment().year(year).isoWeek(week).isoWeekday(1);
    const endDate = moment().year(year).isoWeek(week).isoWeekday(7);
    while (startDate <= endDate) {
      dates.push(startDate.format("DD-MM-YYYY"));
      startDate = startDate.clone().add(1, "days");
    }
    return dates;
  };

  const getWeekNumbersOfMonth = (year, month) => {
    const firstDayOfMonth = moment()
      .year(year)
      .month(month - 1)
      .date(1);
    const lastDayOfMonth = firstDayOfMonth.clone().endOf("month");

    const weeks = [];
    let currentDate = firstDayOfMonth.clone().startOf("isoWeek");

    while (currentDate.isBefore(lastDayOfMonth)) {
      let week = {};
      week.value = currentDate.isoWeek();
      week.label = currentDate.isoWeek();
      weeks.push(week);
      currentDate.add(1, "week");
    }

    return weeks;
  };

  const [year, setyear] = useState(moment().year());
  const [week, setWeek] = useState(moment().week());
  const [employeesData, setEmployeesData] = useState([]);
  const [dates, setDates] = useState(getDatesOfWeek(moment().year(), week));
  const [weeksOfMonth, setWeeksOfMonth] = useState(
    getWeekNumbersOfMonth(year, moment().month() + 1)
  );
  const handleWeekChange = (value) => {
    setWeek(value);
    setDates(getDatesOfWeek(year, value));
  };

  let columnheader = [];

  useEffect(() => {
    console.log(dates);

    const fetch = async () => {
      const data = await getFormatedData();
    };
    fetch();
  }, [week]);

  const getFormatedData = async () => {
    await setEmployeesData((d) => formatedData(employees));
    return employeesData;
  };

  const getMonthByWeek = (year, week) => {
    const date = moment(`${year}-01-01`).add((week - 1) * 7, "days");
    console.log(date);
    console.log(date.format("MM"));
  };

  columnheader = ["Name", ...dates];

  return (
    <div className="d-flex justify-content-center align-items-center week-board">
      <div>
        <div>
          <Select
            options={weeksOfMonth}
            defaultValue={week}
            onChange={handleWeekChange}
          />
        </div>
        <div>
          {columnheader.map((column) => (
            <span className="data-cell">{column}</span>
          ))}
        </div>
        {employeesData.map((employee) => {
          return <EmployeeRow employee={employee} dates={dates} />;
        })}
      </div>
    </div>
  );
};

export default WeekRow;
