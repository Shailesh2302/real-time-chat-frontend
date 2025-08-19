import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://real-time-chat-backend-1-87vj.onrender.com/api",
  withCredentials: true,
});

