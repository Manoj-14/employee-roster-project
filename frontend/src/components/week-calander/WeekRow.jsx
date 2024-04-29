import { Select } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
// import { employees } from "../../resources/data/employee";
import { formatedData } from "../../resources/data/dataFormatting";
import "./week-calander.css";
import { Form } from "react-bootstrap";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getAllUser } from "../../api";

const EmployeeRow = ({ employee, dates }) => {
  const getShift = (shift) => {
    if (shift === "GENERAL" || shift === "EVENING" || shift === "MORNING")
      return shift;
    else return "na";
  };

  return (
    <div>
      <span className="data-cell">{employee.name}</span>
      {dates.map((day) => {
        return (
          <Form.Select
            className="data-cell"
            value={getShift(employee[day])}
            defaultValue={getShift(employee[day])}
            disabled={getShift(employee[day]) === "na"}
          >
            <option value="GENERAL">General </option>
            <option value="MORNING">Morning </option>
            <option value="EVENING">Evening </option>
            <option style={{ display: "none" }} value="na">
              Not Assigned
            </option>
          </Form.Select>
        );
      })}
    </div>
  );
};

const WeekRow = () => {
  const [employees, setEmployees] = useState([]);

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
    const fetchusers = async () => {
      const response = await getAllUser();
      setEmployees(response.data);
      const data = await getFormatedData(response.data);
      setEmployeesData((d) => data);
    };
    fetchusers();
    console.log(formatedEndDates(weeksOfMonth, year));
  }, []);

  useEffect(() => {
    setDates(getDatesOfWeek(year, week));
    const fetch = async () => {
      const data = await getFormatedData(employees);
      console.log("Data", data);
      setEmployeesData((d) => data);
    };
    fetch();
  }, [week]);

  const getFormatedData = async (employees) => {
    const data = await formatedData(employees);
    return data;
  };

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
          <p>{getMonthByWeek(year, week)}</p>
          <CaretLeftOutlined onClick={handleDecrementWeek} />
          <Select
            options={formatedEndDates(weeksOfMonth, year)}
            defaultValue={getWeekDates(week, year)}
            value={getWeekDates(week, year)}
            onChange={handleWeekChange}
          />
          <CaretRightOutlined onClick={handleIncrementWeek} />
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
