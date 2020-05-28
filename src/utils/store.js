import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";
import { setToken } from "./authHeader";

const loggerMiddleware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saveAuthToken = (store) => (next) => (action) => {
    if (action.type === "LOGIN_SUCCESS") {
        setToken(action.data.user_app_token);
    }

    // continue processing this action
    return next(action);
};

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware, loggerMiddleware, saveAuthToken)
    )
);