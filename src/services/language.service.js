import { BASE_URL, API } from "../utils/constants";
import { getTokenHeader } from "../utils/authHeader";

const getAll = () => {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...getTokenHeader(),
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