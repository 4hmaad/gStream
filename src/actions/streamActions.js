import {
  CREATED_STREAM,
  FETCHING_FAILED_STREAMS,
  FETCHING_STREAMS,
  FETCHED_STREAMS,
  NOT_FOUND_STREAM,
  FETCHING_STREAM,
  FETCHED_STREAM,
  DELETE_STREAM,
} from "./actionTypes";

import database from "../configs/FirebaseConfig";

let createStream = ({ title, description }) => (dispatch, getState) => {
  let userId = getState().auth.user.id;
  let date = new Date();

  return database
    .collection("streams")
    .add({
      title,
      description,
      userId,
      date,
    })
    .then(() => {
      return database
        .collection("streams")
        .where("userId", "==", userId)
        .orderBy("date", "desc")
        .limit(1)
        .get()
        .then((querySnapShot) => {
          // fetching the same stream because the unique key is generated by the database.
          let latestStreamData = querySnapShot.docs[0].data();
          let latestStreamId = querySnapShot.docs[0].id;
          let newCreatedStream = { id: latestStreamId, ...latestStreamData };

          dispatch({ type: CREATED_STREAM, payload: newCreatedStream });
          return newCreatedStream;
        });
    });
};

let fetchStreams = () => (dispatch) => {
  dispatch({ type: FETCHING_STREAMS });

  database
    .collection("streams")
    .orderBy("date", "desc")
    .get()
    .then(
      (querySnapshot) => {
        let streamsArray = querySnapshot.docs.map((doc) => {
          let id = doc.id;
          return { id, ...doc.data() };
        });

        dispatch({ type: FETCHED_STREAMS, payload: streamsArray });
      },
      (err) => {
        dispatch({ type: FETCHING_FAILED_STREAMS, payload: err });
      }
    );
};

let fetchStream = (streamId = null) => (dispatch) => {
  dispatch({ type: FETCHING_STREAM });

  database
    .collection("streams")
    .doc(streamId)
    .get()
    .then(
      (querySnapShot) => {
        if (querySnapShot.data() === undefined)
          return dispatch({ type: NOT_FOUND_STREAM });

        let requestedStream = querySnapShot.data();
        requestedStream = { id: querySnapShot.id, ...querySnapShot.data() };

        let streamUserId = requestedStream.userId;

        database
          .collection("users")
          .where("id", "==", streamUserId)
          .get()
          .then((querySnapShot) => {
            const streamUserProfile = querySnapShot.docs[0].data();
            console.log(querySnapShot.docs[0]);

            dispatch({
              type: FETCHED_STREAM,
              data: requestedStream,
              user: streamUserProfile,
            });
          });
      },
      (err) => console.error(err)
    );
};

let deleteStream = (streamId = null) => (dispatch) => {
  return database
    .collection("streams")
    .doc(streamId)
    .delete()
    .then(() => {
      dispatch({ type: DELETE_STREAM, streamId });
    });
};

export { createStream, fetchStreams, fetchStream, deleteStream };
