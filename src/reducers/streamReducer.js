export default (state = [], action) => {
  if (action.type === "FETCH_STREAMS") {
    return action.payload
  } else if (action.type === "CREATE_STREAM") {
    return [action.payload, ...state]
  }

  return state
}
