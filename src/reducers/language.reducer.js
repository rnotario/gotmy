const initialState = {
  languages: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_LANGUAGES_REQUEST":
      return Object.assign(
        {},
        {
          ...state,
          loading: true,
        }
      );
    case "GET_LANGUAGES_FAILURE":
      return Object.assign(
        {},
        {
          ...state,
          loading: false,
          error: action.error,
        }
      );
    case "GET_LANGUAGES_SUCCESS":
      return Object.assign(
        {},
        {
          ...state,
          loading: false,
          languages: action.data,
        }
      );
    default:
      return state;
  }
};
