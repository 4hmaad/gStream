import database from "../configs/FirebaseConfig";

const fetchUsers = () => async (dispatch) => {
  await database
    .collection("users")
    .get()
    .then((data) => {
      const users = data.docs.map((doc) => {
        return doc.data();
      });

      console.log(data);
      dispatch({ type: "FETCH_USERS", payload: users });
    });
};

export { fetchUsers };
