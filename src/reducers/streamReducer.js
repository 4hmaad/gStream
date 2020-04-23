export default (state = [], action) => {
  if (action.type === "CREATE_STREAM") {
    return [...state, action.payload]
  } else if (action.type === "FETCH_STREAMS") {
    return action.payload
  }

  return state
}
