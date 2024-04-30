import axios from "axios";
import { BASE_URL } from "./constant";

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
