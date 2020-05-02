import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIRESTORE_API_KEY,
  authDomain: "http://localhost/",
  projectId: "streaming-app-274410",
});

export default firebase.firestore();
