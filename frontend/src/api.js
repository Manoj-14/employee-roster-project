import axios from "axios";
import { BASE_URL } from "./constant";

export const getAllUser = async () => {
  const response = await axios.get(`${BASE_URL}/user/get`);
  return response;
};

export const AddEmployee = async (data) => {
  const response = await axios.post(`${BASE_URL}/user/create`, { data });
  return response;
};
