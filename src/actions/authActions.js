import { SIGNING_IN, SIGNED_IN, SIGN_OUT, AUTH_ERR } from "./actionTypes";

import database from "../configs/FirebaseConfig";

const signIn = (userProfile) => (dispatch) => {
  dispatch({ type: SIGNING_IN });

  database
    .collection("users")
    .doc(userProfile.id)
    .set({
      ...userProfile,
    })
    .then(
      () => {
        dispatch({ type: SIGNED_IN, payload: userProfile });
      },
      (error) => {
        dispatch({ type: AUTH_ERR, payload: error });
      }
    );
};

const signOut = () => {
  return {
    type: SIGN_OUT,
    payload: null,
  };
};

export { signIn, signOut };
