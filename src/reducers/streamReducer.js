export default (state = {}, action) => {
  if (action.type === "CREATE_STREAM") {
    return { ...state, stream: action.payload }
  }

  return state
}
