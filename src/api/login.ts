import { get, post } from ".";

export async function getCode() {
  return get("/back/getCode");
}

export async function fetchLogin(code: string) {
  return post<{ isLogin: boolean }>("/back/login", { code });
}
