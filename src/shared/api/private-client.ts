import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import type { Option } from "../types/option";

const injected = {
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URI,
};

const instance = axios.create({
  baseURL: injected.baseUrl,
  withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});

export const privateApiClient = {
  async query<Result>(config: AxiosRequestConfig) {
    let _res: ApiClientResponse<Result> = {
      data: null,
      error: null,
    };

    async function executeQuery() {
      await instance
        .request<Result>(config)
        .then((res) => (_res = { error: null, data: res.data }))
        .catch((err) => (_res = { data: null, error: err }));
    }

    await executeQuery();

    return {
      success: _res?.data,
      error: _res?.error,
    };
  },
};

export function isNetworkError(error: ApiRequestError) {
  if (error?.code) {
    return (
      error.code === "ERR_NETWORK" ||
      error.code === "ERR_CANCELED" ||
      error.code === "ENOTFOUND" ||
      error.code === "ECONNRESET" ||
      error.code === "ETIMEOUT"
    );
  }
}

export type ApiRequestError = Option<AxiosError<ApiErrorData>>;

export type ApiClientResponse<SuccessOutput> = {
  data: Option<SuccessOutput>;
  error: Option<AxiosError<ApiErrorData>>;
};

export type ApiErrorData = {
  message: ErrorMessage;
  statusCode: number;
};

type ErrorMessage = Option<string>;
