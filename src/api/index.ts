import axios from "axios";
import { message } from "antd";

const httpInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_BASE_PORT}`,
  timeout: 5000,
});

httpInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    message.error("请求失败");
    return Promise.reject(error);
  }
);

httpInstance.interceptors.response.use(
  (res) => {
    const { code, result, msg } = res.data;
    if (code === 301) {
      message.warning(msg);
    } else if (code === 200 && result.isShowMessage) {
      message.success(msg);
    }
    return result;
  },
  (error) => {
    message.error("网络错误");
    return Promise.reject(error);
  }
);

export type ClientError = {
  code: number;
  msg: string;
};

export const post = <T>(url: string, data?: any): T => {
  return httpInstance.post<T>(url, data) as T;
};

export const get = <T>(url: string, data?: any): T => {
  return httpInstance.get<T>(url, { params: data }) as T;
};
