import requestHandler from "./request-handler";
const BASE_URL = "/api/users";

export function login(userInfo) {
  return requestHandler(`${BASE_URL}/login`, "POST", userInfo);
}

export function register(userInfo) {
  return requestHandler(`${BASE_URL}/register`, "POST", userInfo);
}

export function updateProfile(userId, userInfo) {
  return requestHandler(
    `${BASE_URL}/${userId}/update-profile`,
    "PUT",
    userInfo
  );
}

export function searchBook(bookTitle) {
  return requestHandler("/api/books/search", "POST", bookTitle);
}
