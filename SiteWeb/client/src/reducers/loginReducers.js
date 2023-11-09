import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../constants/types";

const initState = {
  token: "",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  },
  authenticated: false,
  authenticating: false,
};

export default (state = initState, action) => {
  console.log(action);

  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state, 
        token: action.payload.token,
        user: action.payload.user,
        authenticated: true,
        authenticating: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        token: "",
        user: {
          firstName: "",
          lastName: "",
          email: "",
          role: "",
         },
        authenticated: false,
        authenticating: false,
      };
    default:
      return state;
  }
};
