export default (state = [], action) => {
  if (action.type === "CREATE_STREAM") {
    return [...state, action.payload]
  }

  return state
}
