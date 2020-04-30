import { BASE_URL, API } from "../utils/constants";
import authHeader from "../utils/authHeader";

const getAll = () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };

  return fetch(`${BASE_URL}/${API}/languages/all`, requestOptions)
    .then((rawData) => rawData.json())
    .then((response) => {
      return response;
    });
};

export const languageService = {
  getAll,
};
