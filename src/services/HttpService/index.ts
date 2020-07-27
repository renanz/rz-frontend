import axios, { AxiosInstance, AxiosResponse } from "axios";
import { pathOr } from "ramda";
import * as querystring from "query-string";
import { authInstance } from "../AuthService/react-auth0-spa";

export class HttpService {
  private axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: this.trimSlashes(process.env.REACT_APP_BACKEND_URL!),
    });
    this.axios.interceptors.response.use(
      this.onFulfilledRequest,
      this.onRejectedRequest
    );
  }

  public async get<T>(url: string, options?: { params: any }): Promise<T> {
    const token = await this.buildToken();
    let queryParams = "";
    if (options && options.params) {
      queryParams = this.getQueryStringFromParams(options.params);
    }
    const response = await this.axios.get<T>(
      `${this.trimSlashes(url)}${queryParams}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async post<T>(url: string, data?: any): Promise<T | void> {
    if (this.hasToLogin()) {
      authInstance!.loginWithRedirect();
      return;
    }
    const token = await this.buildToken(true);
    const response = await this.axios.post<T>(this.trimSlashes(url), data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async put(url: string, data: any) {
    if (this.hasToLogin()) {
      return authInstance!.loginWithRedirect();
    }
    const token = await this.buildToken(true);

    const response = await this.axios.put(this.trimSlashes(url), data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    return response.data;
  }

  public async delete(url: string) {
    if (this.hasToLogin()) {
      return authInstance!.loginWithRedirect();
    }
    const token = await this.buildToken(true);

    const response = await this.axios.delete(this.trimSlashes(url), {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  }

  private trimSlashes(str: string): string {
    return str.replace(/\/+\s*$/, "").replace(/^\/+\s*/, "");
  }

  private onFulfilledRequest = (response: AxiosResponse) => response;

  private onRejectedRequest(error: any) {
    if (!error.response) throw error;
    switch (error.response.status) {
      case 401:
        return authInstance!.loginWithRedirect();
      case 500:
        throw error;
      case 404:
      case 400:
        throw pathOr({ message: error }, ["response", "data"], error);
    }
  }

  private hasToLogin(): boolean {
    return !authInstance!.isAuthenticated;
  }

  private async buildToken(needsToken = false): Promise<string> {
    let token = "";
    try {
      token = await authInstance!.getTokenSilently();
    } catch (error) {
      if (error.error === "login_required" && needsToken) {
        throw error;
      }
    }
    return `Bearer ${token}`;
  }

  private getQueryStringFromParams(params: object): string {
    return `?${querystring.stringify(params)}`;
  }
}

export const httpService = new HttpService();
