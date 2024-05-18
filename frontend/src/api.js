import axios from "axios";
import { BASE_URL } from "./constant";
import { convertArraysToObjects } from "./resources/data/dataFormatting";
import { months } from "moment";

export const getAllUser = async () => {
  const response = await axios.get(`${BASE_URL}/user/get`);
  return response;
};

export const AddEmployee = async (data) => {
  console.log(data);
  const response = await axios
    .post(`${BASE_URL}/user/create`, data)
    .catch((err) => {
      if (err.status === 406) {
        throw new Error("User Already Exists");
      }
    });
  return response;
};

export const userLogin = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/user/login`, {
    email,
    password,
  });
  return response;
};

export const updateEmployeeShift = async (user) => {
  const response = await axios.put(`${BASE_URL}/user/update/${user.id}`, user);
  return response;
};

export const getRosterOfMonth = async (month, year) => {
  const response = await axios
    .get(`${BASE_URL}/api/monthRoster/${year}/${month}`)
    .then((resp) => {
      let data = resp.data;
      for (let i = 0; i < data.rosters.length; i++) {
        data.rosters[i] = convertArraysToObjects(data.rosters[i]);
      }
      return data;
    });
  return response;
};

export const getRosterOfUser = async (userId, month, year) => {
  const data = await axios
    .get(`${BASE_URL}/api/roster/${userId}`, { params: { month, year } })
    .then((resp) => convertArraysToObjects(resp.data));
  return data;
};

export const changeCurrentShift = (userId, fromShift, toShift) => {
  console.log(fromShift, toShift);
  const response = axios
    .put(`${BASE_URL}/api/roster/changeShift/${userId}`, {
      fromShift,
      toShift,
    })
    .then((resp) => convertArraysToObjects(resp.data));

  console.log(response);
  return response;
};
