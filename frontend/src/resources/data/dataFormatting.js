import moment from "moment";

const getListOfDate = (year, month) => {
  const totalDaysInMonth = moment(`${year}-${month}`).daysInMonth();
  const startDate = moment(`${year}-${month}-01`);
  const endDate = moment(`${year}-${month}-${totalDaysInMonth}`);

  const dates = [];

  while (startDate.isSameOrBefore(endDate, "day")) {
    dates.push(startDate.format("DD-MM-YYYY"));
    startDate.add(1, "day");
  }

  return dates;
};

export const formatedData = (employees) => {
  const dates = getListOfDate(moment().year(), moment().month() + 1);
  let formatedData = [];
  employees.forEach((employee) => {
    dates.forEach((date) => {
      employee = { ...employee, [date]: employee.shift };
    });
    formatedData.push(employee);
  });

  return formatedData;
};
