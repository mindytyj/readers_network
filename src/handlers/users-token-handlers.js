import * as usersAPIRequests from "./users-api-requests";

export async function login(userInfo) {
  const jwtToken = await usersAPIRequests.login(userInfo);
  localStorage.setItem("token", jwtToken);
  return jwtToken;
}

export async function register(userInfo) {
  const jwtToken = await usersAPIRequests.register(userInfo);
  localStorage.setItem("token", jwtToken);
  return jwtToken;
}

export function getJWTToken() {
  const jwtToken = localStorage.getItem("token");
  if (!jwtToken) return null;
  const payload = JSON.parse(atob(jwtToken.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return null;
  }
  return jwtToken;
}

export function getUser() {
  const jwtToken = getJWTToken();
  return jwtToken ? JSON.parse(atob(jwtToken.split(".")[1])).user : null;
}
