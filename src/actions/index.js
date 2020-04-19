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

const fetchUsers = () => dispatch => {
  database
    .collection("users")
    .get()
    .then(data => {
      const users = data.docs.map(doc => {
        return doc.data()
      })

      dispatch({ type: "FETCH_USERS", payload: users })
    })
}

export { signIn, signOut, createStream, fetchUsers }
