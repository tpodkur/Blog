import axios, { type AxiosRequestConfig } from 'axios';

import { getToken, isExpired } from './token-provider.ts';

class TokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenError';
  }
}

const addAuthHeader = (config: AxiosRequestConfig) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Token ${getToken()?.value}`,
  },
});

const checkToken = () => {
  const token = getToken();
  const isTokenExpired = isExpired(token?.timeStamp);
  if (!token || isTokenExpired) {
    throw new TokenError('Token is missing or expired.');
  }
};

const authRequest = {
  get: async (url: string, config: AxiosRequestConfig = {}) => {
    checkToken();
    const options = addAuthHeader(config);
    return axios.get(url, options);
  },
  post: async (url: string, data?: object, config: AxiosRequestConfig = {}) => {
    checkToken();
    const options = addAuthHeader(config);
    return axios.post(url, data, options);
  },
  put: async (url: string, data: object, config: AxiosRequestConfig = {}) => {
    checkToken();
    const options = addAuthHeader(config);
    return axios.put(url, data, options);
  },
  delete: async (url: string, config: AxiosRequestConfig = {}) => {
    checkToken();
    const options = addAuthHeader(config);
    return axios.delete(url, options);
  },
};

export default authRequest;
