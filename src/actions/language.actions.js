import { languageService } from "../services";

const getAll = () => {
  return (dispatch) => {
    dispatch(request());

    languageService.getAll().then(
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
      type: "GET_LANGUAGES_REQUEST",
    };
  }

  function failure(error) {
    return {
      type: "GET_LANGUAGES_FAILURE",
      error,
    };
  }

  function success(data) {
    return {
      type: "GET_LANGUAGES_SUCCESS",
      data,
    };
  }
};

export const languageActions = {
  getAll
};
