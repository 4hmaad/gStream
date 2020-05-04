const INITIAL_STATE = {
  isSignedIn: null,
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { isSignedIn: true, user: action.payload };
    case "SIGN_OUT":
      return { isSignedIn: false, user: null };
    default:
      return { ...state };
  }
};
