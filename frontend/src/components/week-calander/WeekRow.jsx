import { Button, Select } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
// import { employees } from "../../resources/data/employee";
import {
  convertArraysToObjects,
  formatedData,
} from "../../resources/data/dataFormatting";
import "./week-calander.css";
import { Form } from "react-bootstrap";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, getRosterOfMonth } from "../../api";

const EmployeeRow = ({ employee, dates }) => {
  const { user } = useSelector((state) => state.user);
  const getShift = (shift) => {
    switch (shift) {
      case "generalShift":
        return "GENERAL";
      case "eveningShift":
        return "EVENING";
      case "morningShift":
        return "MORNING";
      case "weekOffs":
        return "WEEKOFF";
      case "holidays":
        return "HOLIDAY";
      default:
        return "na";
    }
  };

  return (
    <div
      style={
        employee.user.id === user.id
          ? { order: -1, border: "1px solid black" }
          : undefined
      }
    >
      <span className="data-cell">{employee.user.name}</span>
      {dates.map((day) => {
        return (
          <Form.Select
            className="data-cell"
            value={getShift(employee[day])}
            defaultValue={getShift(employee[day])}
            disabled={
              getShift(employee[day]) === "na" ||
              day !== moment().format("DD-MM-YYYY") ||
              employee.empId !== user.empId
            }
          >
            <option value="GENERAL">General</option>
            <option value="MORNING">Morning</option>
            <option value="EVENING">Evening</option>
            <option value="WEEKOFF">Weekend</option>
            <option value="HOLIDAY">Weekend</option>
            <option
              className="shift-option"
              style={{ display: "none" }}
              value="na"
            >
              Not Assigned
            </option>
          </Form.Select>
        );
      })}
    </div>
  );
};

const WeekRow = () => {
  // const [employees, setEmployees] = useState([]);

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
      weeks.push(currentDate.isoWeek());
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

  const getWeekDates = (weekNumber, year) => {
    weekNumber = parseInt(weekNumber);
    year = parseInt(year);

    const startOfWeek = moment().year(year).week(weekNumber).startOf("week");
    const endOfWeek = moment().year(year).week(weekNumber).endOf("week");

    const firstDate = startOfWeek.format("DD-MM-YYYY");
    const lastDate = endOfWeek.format("DD-MM-YYYY");

    return `${firstDate} to ${lastDate}`;
  };

  const handleIncrementWeek = () => {
    console.log(week);
    setWeek((p) => p + 1);
    console.log(week);
  };
  const handleDecrementWeek = () => {
    console.log(week);
    setWeek((p) => p - 1);
    console.log(week);
  };

  let columnheader = [];

  useEffect(() => {
    setDates(getDatesOfWeek(year, week));
    const fetch = async () => {
      const data = await getRosterOfMonth(5, 2024);
      console.log("Data", data);
      setEmployeesData((d) => data.rosters);
    };
    fetch();
  }, [week]);

  const getMonthByWeek = (year, week) => {
    const date = moment(`${year}-01-01`).add((week - 1) * 7, "days");
    return date.format("MMMM");
  };

  columnheader = ["Name", ...dates];
  const formatedEndDates = (weekNums, year) => {
    const formatedWeekDates = [];
    weekNums.forEach((weekNum) => {
      const option = {};
      option.label = getWeekDates(weekNum, year);
      option.value = getWeekDates(weekNum, year);
      formatedWeekDates.push(option);
    });
    console.log(formatedWeekDates);
    return formatedWeekDates;
  };

  return (
    <div className="d-flex justify-content-center align-items-center week-board">
      <div>
        <div>
          <p className="h3 text-center">All Employee Weekly Roster</p>
          <div className="week-header d-flex justify-content-between">
            <p className="alert alert-info p-1">
              Month {getMonthByWeek(year, week)}
            </p>
            <div>
              <CaretLeftOutlined onClick={handleDecrementWeek} />
              <Select
                options={formatedEndDates(weeksOfMonth, year)}
                defaultValue={getWeekDates(week, year)}
                value={getWeekDates(week, year)}
                onChange={handleWeekChange}
              />
              <CaretRightOutlined onClick={handleIncrementWeek} />
            </div>
          </div>
          <div>
            {columnheader.map((column) => (
              <span className="data-cell">{column}</span>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column">
          {employeesData.map((employee) => {
            return <EmployeeRow employee={employee} dates={dates} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekRow;
