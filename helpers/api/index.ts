import { getCookie } from "cookies-next";
import { pickBy } from "lodash";

import { USER_TOKEN_KEY } from "../../constants";
import { LoginService } from "@/services/login";

export class Api {
  private static headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  static async get<T extends Record<string, any> | string>(
    endpoint: string,
    config?: { query?: Record<string, any>; headers?: Record<string, any> },
  ) {
    const url = new URL(endpoint);

    url.search = new URLSearchParams(
      pickBy(config?.query, (value) => !!value),
    ).toString();

    let response = await fetch(url, {
      method: "GET",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${getCookie(USER_TOKEN_KEY)?.toString()}`,
        ...config?.headers,
      },
    });

    if (response.status === 401) {
      const newToken = await LoginService.reAuthenticate();

      if (newToken) {
        response = await fetch(url, {
          method: "GET",
          headers: {
            ...this.headers,
            ...config?.headers,
            Authorization: `Bearer ${newToken}`,
          },
        });
      }
    }

    if (response.status !== 200) {
      const data = (await response.json()) as any;

      throw data.message;
    }

    return (await response.json()) as unknown as T;
  }

  static async post<T extends Record<string, any> | string>(
    endpoint: string,
    config?: {
      query?: Record<string, any>;
      headers?: Record<string, any>;
      body?: Record<string, any>;
    },
  ) {
    return this.mutate<T>(endpoint, "POST", config);
  }

  static async put<T extends Record<string, any> | string>(
    endpoint: string,
    config?: {
      query?: Record<string, any>;
      headers?: Record<string, any>;
      body?: Record<string, any>;
    },
  ) {
    return this.mutate<T>(endpoint, "PUT", config);
  }

  static async patch<T extends Record<string, any> | string>(
    endpoint: string,
    config?: {
      query?: Record<string, any>;
      headers?: Record<string, any>;
      body?: Record<string, any>;
    },
  ) {
    return this.mutate<T>(endpoint, "PATCH", config);
  }

  static async delete<T extends Record<string, any> | string>(
    endpoint: string,
    config?: {
      query?: Record<string, any>;
      headers?: Record<string, any>;
    },
  ) {
    return this.mutate<T>(endpoint, "DELETE", config);
  }

  private static async mutate<T extends Record<string, any> | string>(
    endpoint: string,
    method: "PUT" | "POST" | "DELETE" | "PATCH",
    config?: {
      query?: Record<string, any>;
      headers?: Record<string, any>;
      body?: Record<string, any>;
    },
  ) {
    const url = new URL(endpoint);

    url.search = new URLSearchParams(
      pickBy(config?.query, (value) => value !== null && value !== undefined),
    ).toString();

    let response = await fetch(url, {
      method: method,
      headers: {
        ...this.headers,
        Authorization: `Bearer ${getCookie(USER_TOKEN_KEY)?.toString()}`,
        ...config?.headers,
      },
      body: JSON.stringify(config?.body),
    });

    if (response.status === 401) {
      const newToken = await LoginService.reAuthenticate();

      if (newToken) {
        response = await fetch(endpoint, {
          method: "POST",
          headers: {
            ...this.headers,
            ...config?.headers,
            Authorization: `Bearer ${newToken}`,
          },
          body: JSON.stringify(config?.body),
        });
      }
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/text")) {
      return await response.text();
    }

    try {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as unknown as T;
      }
    } catch (e) {
      JSON.stringify(e);
    }

    return true;
  }
}
