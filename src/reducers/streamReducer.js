export default (state = [], action) => {
  if (action.type === "FETCH_STREAMS") {
    return action.payload
  }

  return state
}
