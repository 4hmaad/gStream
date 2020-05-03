import database from "../configs/FirebaseConfig";

const signIn = (userData) => (dispatch) => {
  database
    .collection("users")
    .doc(userData.id)
    .set({
      ...userData,
    })
    .then(() => {
      dispatch({ type: "SIGN_IN", payload: userData });
    });
};

const signOut = () => {
  return {
    type: "SIGN_OUT",
    payload: null,
  };
};

export { signIn, signOut };
