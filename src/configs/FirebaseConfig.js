import firebase from "firebase/app"
import "firebase/firestore"

firebase.initializeApp({
  apiKey: "AIzaSyAKDc-zxzY22HeKSEKpY5eJWix5Fzz9kJY",
  authDomain: "http://localhost/",
  projectId: "streaming-app-274410",
})

export default firebase.firestore()
