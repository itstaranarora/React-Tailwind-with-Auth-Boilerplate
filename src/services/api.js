import http from "./httpServices";
import { getRefresh, getAccess } from "utils/token";

const AuthConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getAccess(),
  },
};

const Config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export async function loginUser(data) {
  return http.post("token", data, Config);
}

export const fetcher = (resource) =>
  http.get(resource, AuthConfig).then((res) => res.data);

export async function registerUser(data) {
  return http.post("register", data, Config);
}

export async function refreshToken() {
  return http.post("refresh", {
    refresh: getRefresh(),
  });
}
