import { userService } from "../services";

const login = (user) => {
  return (dispatch) => {
    dispatch(request());

    userService.login(user).then(
      (response) => {
        if (!response.success) {
          dispatch(failure(response.error));
        } else {
          dispatch(success(response.data));
        }
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return {
      type: "LOGIN_REQUEST",
    };
  }

  function failure(error) {
    return {
      type: "LOGIN_FAILURE",
      error,
    };
  }

  function success(data) {
    return {
      type: "LOGIN_SUCCESS",
      data,
    };
  }
};

const register = (user) => {
  return (dispatch) => {
    dispatch(request());

    userService.register(user).then(
      (response) => {
        if (!response.success) {
          dispatch(failure(response.error));
        } else {
          dispatch(success(response.data));
        }
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return {
      type: "REGISTER_REQUEST",
    };
  }

  function failure(error) {
    return {
      type: "REGISTER_FAILURE",
      error,
    };
  }

  function success(data) {
    return {
      type: "REGISTER_SUCCESS",
      data,
    };
  }
};

const updateProfile = (user) => {
  return (dispatch) => {
    dispatch(request());

    userService.update(user).then(
      (response) => {
        if (!response.success) {
          dispatch(failure(response.error));
        } else {
          // convert user_languages to array if it's not
          let formatted;
          if (!Array.isArray(response.data.user_languages)) {
            formatted = Object.assign(
              {},
              {
                ...response.data,
                user_languages: [response.data.user_languages],
              }
            );
          }
          dispatch(success(formatted || response.data));
        }
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return {
      type: "UPDATE_PROFILE_REQUEST",
    };
  }

  function failure(error) {
    return {
      type: "UPDATE_PROFILE_FAILURE",
      error,
    };
  }

  function success(data) {
    return {
      type: "UPDATE_PROFILE_SUCCESS",
      data,
    };
  }
};

const getProfile = () => {
  return (dispatch) => {
    dispatch(request());

    userService.get().then(
      (response) => {
        if (!response.success) {
          dispatch(failure(response.error));
        } else {
          dispatch(success(response.data));
        }
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return {
      type: "GET_PROFILE_REQUEST",
    };
  }

  function failure(error) {
    return {
      type: "GET_PROFILE_FAILURE",
      error,
    };
  }

  function success(data) {
    return {
      type: "GET_PROFILE_SUCCESS",
      data,
    };
  }
};

export const userActions = {
  login,
  register,
  getProfile,
  updateProfile,
};
