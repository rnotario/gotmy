const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return Object.assign(
        {},
        {
          ...state,
          loading: true,
        }
      );
    case "LOGIN_FAILURE":
      return Object.assign(
        {},
        {
          ...state,
          loading: false,
          error: action.error,
        }
      );
    case "LOGIN_SUCCESS":
      return Object.assign(
        {},
        {
          ...state,
          loading: false,
          currentUser: action.data,
        }
      );
    case "REGISTER_REQUEST":
      return Object.assign(
        {},
        {
          ...state,
          loading: true,
        }
      );
    case "REGISTER_FAILURE":
      return Object.assign(
        {},
        {
          ...state,
          loading: false,
          error: action.error,
        }
      );
    case "REGISTER_SUCCESS":
      return Object.assign(
        {},
        {
          ...state,
          loading: false,
        }
      );
    case "GET_PROFILE_REQUEST":
      return Object.assign(
        {},
        {
          ...state,
          loading: true,
        }
      );
    case "GET_PROFILE_FAILURE":
      return Object.assign(
        {},
        {
          ...state,
          loading: false,
          error: action.error,
        }
      );
    case "GET_PROFILE_SUCCESS":
      return Object.assign(
        {},
        {
          ...state,
          loading: false,
          currentUser: action.data,
        }
      );
    case "UPDATE_PROFILE_REQUEST":
      return Object.assign(
        {},
        {
          ...state,
          loading: true,
        }
      );
    case "UPDATE_PROFILE_FAILURE":
      return Object.assign(
        {},
        {
          ...state,
          loading: false,
          error: action.error,
        }
      );
    case "UPDATE_PROFILE_SUCCESS":
      return Object.assign(
        {},
        {
          ...state,
          loading: false,
          currentUser: action.data,
        }
      );
    default:
      return state;
  }
};
