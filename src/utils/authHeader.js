let currentToken = "8ec3c26267f725ea832c49da0d81ff8304626cfd";

export const setToken = (token) => {
    currentToken = token;
};

export const getTokenHeader = () => ({
    "Access-Token": currentToken,
});