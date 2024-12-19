import requestHandler from "./request-handler";
const BASE_URL = "/api/users";

export function login(userInfo) {
  return requestHandler(`${BASE_URL}/login`, "POST", userInfo);
}
