import * as usersAPIRequests from "./users-api-requests";

export async function login(userInfo) {
  const user = await usersAPIRequests.login(userInfo);
  return user;
}

export async function register(userInfo) {
  const user = await usersAPIRequests.register(userInfo);
  return user;
}
