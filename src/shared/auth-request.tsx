import axios, { type AxiosRequestConfig } from 'axios';

import { getToken } from './token-provider.ts';

const addAuthHeader = (config: AxiosRequestConfig) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Token ${getToken()}`,
  },
});

const authRequest = {
  get: async (url: string, config: AxiosRequestConfig = {}) => {
    const options = addAuthHeader(config);
    return axios.get(url, options);
  },
  post: async (url: string, data: object, config: AxiosRequestConfig = {}) => {
    const options = addAuthHeader(config);
    return axios.post(url, data, options);
  },
};

export default authRequest;
