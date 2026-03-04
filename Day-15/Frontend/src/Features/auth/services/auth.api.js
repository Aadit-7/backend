import axios from "axios";

const api =  axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  const respose = await api.post("/v1/auth/register", {
    username,
    email,
    password,
  });

  return respose.data;
}

export async function login({ username, password }) {
  const respose = await api.post("/v1/auth/login", {
    username,
    password,
  });

  return respose.data;
}

export async function getMe() {
  const respose = await api.get("/v1/auth/get-me");

  return respose.data;
}

export async function logout() {
  const respose = await api.get("/v1/auth/logout");

  return respose.data;
}
