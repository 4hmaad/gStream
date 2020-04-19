import database from "../configs/FirebaseConfig"

const signIn = userId => {
  return {
    type: "SIGN_IN",
    payload: userId,
  }
}

const signOut = () => {
  return {
    type: "SIGN_OUT",
    payload: null,
  }
}

const createStream = ({ title, description }) => async dispatch => {
  await database
    .collection("streams")
    .doc(title)
    .set({
      title,
      description,
    })
    .then(() => {
      dispatch({ type: "CREATE_STREAM", payload: { title, description } })
    })
}

export { signIn, signOut, createStream }
