import database from "../configs/FirebaseConfig";

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
        database
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
          });
      },
      (err) => {
        console.error(err);
      }
    );
};

const fetchStreams = () => async (dispatch) => {
  await database
    .collection("streams")
    .orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
      const streamsArray = [];
      querySnapshot.forEach(function (doc) {
        const id = doc.id;
        streamsArray.push({ ...doc.data(), id });
      });

      const streams = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });

      console.log(streams);

      dispatch({ type: "FETCH_STREAMS", payload: streamsArray });
    });
};

export { createStream, fetchStreams };
