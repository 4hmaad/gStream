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

const fetchUsers = () => async dispatch => {
  await database
    .collection("users")
    .get()
    .then(data => {
      const users = data.docs.map(doc => {
        return doc.data()
      })

      console.log(data)
      dispatch({ type: "FETCH_USERS", payload: users })
    })
}

const fetchStreams = () => dispatch => {
  database
    .collection("streams")
    .orderBy("date", "desc")
    .get()
    .then(querySnapshot => {
      const streamsArray = []
      querySnapshot.forEach(function (doc) {
        const id = doc.id
        streamsArray.push({ ...doc.data(), id })
      })

      console.log(streamsArray)
      dispatch({ type: "FETCH_STREAMS", payload: streamsArray })
    })
}

export { signIn, signOut, fetchStreams, fetchUsers }
