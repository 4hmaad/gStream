import database from "../configs/FirebaseConfig";

const signIn = (userProfile) => (dispatch) => {
  database
    .collection("users")
    .doc(userProfile.id)
    .set({
      ...userProfile,
    })
    .then(
      () => {
        dispatch({ type: "SIGN_IN", payload: userProfile });
      },
      (err) => {
        console.log(err);
      }
    );
};

const signOut = () => {
  return {
    type: "SIGN_OUT",
    payload: null,
  };
};

export { signIn, signOut };
