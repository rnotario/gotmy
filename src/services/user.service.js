import { BASE_URL, API } from "../utils/constants";
import authHeader from "../utils/authHeader";

const login = (formData) => {
  console.log(formData);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(formData),
  };

  return fetch(`${BASE_URL}/${API}/auth/login`, requestOptions)
    .then((rawData) => rawData.json())
    .then((response) => {
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response;
    });
};

const register = (formData) => {
  console.log(formData);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(formData),
  };

  return fetch(`${BASE_URL}/${API}/user/register`, requestOptions)
    .then((rawData) => rawData.json())
    .then((response) => {
      //   if (response.success) {
      //     localStorage.setItem("user", JSON.stringify(response.data));
      //   }
      return response;
    });
};

const get = () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };

  return fetch(`${BASE_URL}/${API}/user/profile`, requestOptions)
    .then((rawData) => rawData.json())
    .then((response) => {
      return response;
    });
};

const update = (formData) => {
  console.log(formData);
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(formData),
  };

  return fetch(`${BASE_URL}/${API}/user/update`, requestOptions)
    .then((rawData) => rawData.json())
    .then((response) => {
      return response;
    });
};

export const userService = {
  login,
  register,
  get,
  update,
};
