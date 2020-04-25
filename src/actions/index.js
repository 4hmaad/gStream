import database from "../configs/FirebaseConfig"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const mySwal = withReactContent(Swal)
const Alert = mySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", mySwal.stopTimer)
    toast.addEventListener("mouseleave", mySwal.resumeTimer)
  },
})

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

/**
 * @name createStream
 * @description The createStream returns another function abiding redux-thunk rule. The returned function expects
 * two functions in parameters: dispatch and getState.
 * The returned function adds the stream, which was passed into createStream, to the database and then dispatches the stream into reducer.
 *
 * @param {String} title The title of the stream.
 * @param {String} description The description of the stream.
 * @return Returns an async action creator function abiding redux-thunk rule.
 */

const createStream = ({ title, description }) => async (dispatch, getState) => {
  const { userId } = getState().auth
  const date = new Date()

  await database
    .collection("streams")
    .add({
      title,
      description,
      userId,
      date,
    })
    .then(() => {
      dispatch({ type: "CREATE_STREAM", payload: { title, description, userId, date } })

      Alert.fire({
        icon: "success",
        title: "Stream created successfully",
      })
    })
    .catch(() => {
      Alert.fire({
        icon: "error",
        title: "Something went wrong! try again",
      })
    })
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
    .get()
    .then(querySnapshot => {
      const streamsArray = []
      querySnapshot.forEach(function (doc) {
        streamsArray.push({ [doc.id]: doc.data() })
      })

      dispatch({ type: "FETCH_STREAMS", payload: streamsArray })
    })
}

export { signIn, signOut, createStream, fetchStreams, fetchUsers }
