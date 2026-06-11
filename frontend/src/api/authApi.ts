import { User } from "../types";
import { apiRequest, clearToken, setToken } from "./client";

type AuthResponse = {
  user: User;
  token: string;
};

export const authApi = {
  async register(input: { name: string; email: string; password: string }) {
    const response = await apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(input)
    });
    setToken(response.token);
    return response.user;
  },

  async login(input: { email: string; password: string }) {
    const response = await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input)
    });
    setToken(response.token);
    return response.user;
  },

  me() {
    return apiRequest<User>("/auth/me");
  },

  logout() {
    clearToken();
  }
};
