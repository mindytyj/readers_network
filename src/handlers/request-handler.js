import { getJWTToken } from "./users-token-handlers";

export default async function requestHandler(
  url,
  method = "GET",
  payload = null
) {
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }
  const jwtToken = getJWTToken();
  if (jwtToken) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${jwtToken}`;
  }
  const res = await fetch(url, options);
  if (res.ok) return res.json();
  throw new Error("Bad Request.");
}
