import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL = "https://reqres.in/api";

class BaseRepoApi {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
      },
    );
  }

  private async handleResponse<T>(promise: Promise<T>): Promise<T> {
    const response = await promise;
    return response;
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const config: AxiosRequestConfig = params ? { params } : {};
    return this.handleResponse(
      this.instance.get<T>(url, config).then((res) => res.data),
    );
  }

  async post<T>(
    url: string,
    body?: Record<string, any>,
    params?: Record<string, any>,
  ): Promise<T> {
    const config: AxiosRequestConfig = params ? { params } : {};
    return this.handleResponse(
      this.instance.post<T>(url, body || {}, config).then((res) => res.data),
    );
  }

  async patch<T>(
    url: string,
    body?: Record<string, any>,
    params?: Record<string, any>,
  ): Promise<T> {
    const config: AxiosRequestConfig = params ? { params } : {};
    return this.handleResponse(
      this.instance.patch<T>(url, body || {}, config).then((res) => res.data),
    );
  }

  async delete<T>(url: string, params?: Record<string, any>): Promise<T> {
    const config: AxiosRequestConfig = params ? { params } : {};
    return this.handleResponse(
      this.instance.delete<T>(url, config).then((res) => res.data),
    );
  }
}

export const baseRepoAPI = new BaseRepoApi();
