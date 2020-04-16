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

export { signIn, signOut }
