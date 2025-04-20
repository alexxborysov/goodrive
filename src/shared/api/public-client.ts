import type { ApiClientResponse } from './private-client';
import axios, { type AxiosRequestConfig } from 'axios';

const injected = {
  baseUrl: process.env.NEXT_BACKEND_API_URI,
};

const instance = axios.create({
  baseURL: injected.baseUrl,
  withCredentials: true,
});

export const publicApiClient = {
  async query<R>(config: AxiosRequestConfig) {
    let _res: ApiClientResponse<R> = {
      data: undefined,
      error: undefined,
    };

    async function executeQuery() {
      await instance
        .request<R>(config)
        .then((res) => (_res = { error: undefined, data: res.data }))
        .catch((err) => (_res = { data: undefined, error: err }));
    }

    await executeQuery();

    return {
      success: _res?.data,
      error: _res?.error,
    };
  },
};
