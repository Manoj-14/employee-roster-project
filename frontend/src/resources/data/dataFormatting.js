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
  console.log("Formated Data", formatedData);

  return formatedData;
};
export const convertArraysToObjects = (data) => {
  const convertedData = {};
  for (const key in data) {
    if (
      data[key].length > 0 &&
      (key === "morningShift" ||
        key === "generalShift" ||
        key === "eveningShift" ||
        key === "weekOffs" ||
        key === "holidays")
    ) {
      const array = data[key];
      array.forEach((value) => {
        convertedData[formatDate(value)] = key;
      });
    } else if (!Array.isArray(data[key])) {
      convertedData[key] = data[key];
    }
  }

  return convertedData;
};

const formatDate = (inputDate) => {
  return moment(inputDate, "YYYY-MM-DD").format("DD-MM-YYYY");
};
