import {
  SIGNING_IN,
  SIGNED_IN,
  SIGN_OUT,
  AUTH_ERR,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  isSignedIn: null,
  isSigningIn: null,
  user: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNING_IN:
      return { ...state, isSignedIn: false, isSigningIn: true };
    case SIGNED_IN:
      return {
        ...state,
        isSignedIn: true,
        isSigningIn: false,
        user: action.payload,
      };
    case SIGN_OUT:
      return { isSignedIn: false, isSigningIn: false, user: null, error: null };
    case AUTH_ERR:
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
};
