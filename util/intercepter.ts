import axios from "axios";
import { toast } from "react-toastify";

const AxiosInstance = axios.create({
  baseURL: "/",
  timeout: 200000,
});
const retry = false;

AxiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401 && !retry) {
      console.log("error", error.response.data.msg);
    } else if (error.response && error.response.status) {
      console.log("error", error.response.data.msg);

      toast.error(
        error.response.data.msg
          ? error.response.data.msg
          : error.response.data.error
          ? error.response.data.error
          : error.response.data
          ? error.response.data
          : error.response.statusText
      );

      return error;
    } else {
      console.log("err", error);
      toast.error("Failed to Connect to the server!");

      return error;
    }
  }
);

export default AxiosInstance;
