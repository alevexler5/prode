import { ApiError } from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
const TOKEN_KEY = "prode_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export class HttpError extends Error {
  statusCode?: number;
  code?: string;

  constructor(payload: ApiError) {
    super(payload.message);
    this.statusCode = payload.statusCode;
    this.code = payload.code;
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = (await response
      .json()
      .catch(() => ({ message: "Error inesperado", statusCode: response.status }))) as
      | ApiError
      | { message: string[] };

    const payload: ApiError = {
      statusCode: response.status,
      message: Array.isArray(error.message) ? error.message.join(", ") : error.message,
      code: "code" in error ? error.code : undefined
    };

    if (response.status === 401) {
      window.dispatchEvent(new CustomEvent("prode:unauthorized"));
    }

    throw new HttpError(payload);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
