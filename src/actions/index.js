import database from "../configs/FirebaseConfig"
import { miniAlert } from "../configs/SweetAlertConfig"

const signIn = userId => {
  return {
    type: "SIGN_IN",
    payload: userId
  }
}

const signOut = () => {
  return {
    type: "SIGN_OUT",
    payload: null
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

const createStream = ({ title, description }) => (dispatch, getState) => {
  const { userId } = getState().auth
  const date = new Date()

  database
    .collection("streams")
    .add({
      title,
      description,
      userId,
      date
    })
    .then(() => {
      database
        .collection("streams")
        .where("userId", "==", userId)
        .orderBy("date", "desc")
        .limit(1)
        .get()
        .then(querySnapShot => {
          const latestStreamData = querySnapShot.docs[0].data()
          const id = querySnapShot.docs[0].id

          const newStream = { id, ...latestStreamData }

          dispatch({ type: "CREATE_STREAM", payload: newStream })

          miniAlert.fire({
            icon: "success",
            title: "Stream created successfully"
          })
        })
    })
    .catch(() => {
      miniAlert.fire({
        icon: "error",
        title: "Something went wrong! try again"
      })
    })
}

const fetchStreams = () => async dispatch => {
  await database
    .collection("streams")
    .orderBy("date", "desc")
    .get()
    .then(querySnapshot => {
      const streamsArray = []
      querySnapshot.forEach(function (doc) {
        const id = doc.id
        streamsArray.push({ ...doc.data(), id })
      })

      const streams = querySnapshot.docs.map(doc => {
        const id = doc.id
        return { id, ...doc.data() }
      })

      console.log(streams)

      dispatch({ type: "FETCH_STREAMS", payload: streamsArray })
    })
}

export { signIn, signOut, fetchStreams, fetchUsers, createStream }
