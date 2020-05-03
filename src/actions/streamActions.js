import database from "../configs/FirebaseConfig";

/**
 * @description The function returns another function abiding Redux middleware rule. The returned function
 * then expects two parameters: dispatch and getState which it is supposed to receive when executed by middleware.
 * When the middleware receives the returned function, it passes the two functions: dispatch and getState in parameters and invokes it.
 *
 * @param {string} values - The values of the form.
 * @returns {Function} Another function abiding Redux middleware rule.
 *
 */
const createStream = ({ title, description }) => (dispatch, getState) => {
  const { userId } = getState().auth;
  const date = new Date();

  return database
    .collection("streams")
    .add({
      title,
      description,
      userId,
      date,
    })
    .then(
      () => {
        return database
          .collection("streams")
          .where("userId", "==", userId)
          .orderBy("date", "desc")
          .limit(1)
          .get()
          .then((querySnapShot) => {
            const latestStreamData = querySnapShot.docs[0].data();
            const id = querySnapShot.docs[0].id;

            const newStream = { id, ...latestStreamData };

            dispatch({ type: "CREATE_STREAM", payload: newStream });

            return newStream;
          });
      },
      (err) => {
        console.error(err);
      }
    );
};

const fetchStreams = () => (dispatch) => {
  return database
    .collection("streams")
    .orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
      const streamsArray = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });

      dispatch({ type: "FETCH_STREAMS", payload: streamsArray });
    });
};

export { createStream, fetchStreams };
