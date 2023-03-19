import axios, { AxiosRequestConfig } from 'axios';
import Keys from './keys';

const instance = axios.create({
  baseURL: 'https://am-api.inqubi.eu/api/v1/',
});

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const getAuthHeader = () => {
  if (window.localStorage) {
    const token = window.localStorage.getItem(Keys.ACCESS_TOKEN) ?? null;
    if (token) {
      return {
        Authorization: `Bearer ${token.replaceAll('"', '')}`,
      };
    }
  }
  return {};
};

export const httpGet = async (url: string, config?: AxiosRequestConfig<any>) => {
  const requestConfig = { headers: { ...defaultHeaders, ...getAuthHeader() }, ...config };
  const response = await instance.get(url, requestConfig);
  return response;
};

export const httpPost = async (url: string, data: any, config?: AxiosRequestConfig<any>) => {
  const requestConfig = { headers: { ...defaultHeaders, ...getAuthHeader() }, ...config };
  const response = await instance.post(url, data, requestConfig);
  return response;
};

export const httpPut = async (url: string, data: any, config?: AxiosRequestConfig<any>) => {
  const requestConfig = { headers: { ...defaultHeaders, ...getAuthHeader() }, ...config };
  const response = await instance.put(url, data, requestConfig);
  return response;
};

export const httpDelete = async (url: string, config?: AxiosRequestConfig<any>) => {
  const requestConfig = { headers: { ...defaultHeaders, ...getAuthHeader() }, ...config };
  const response = await instance.delete(url, requestConfig);
  return response;
};