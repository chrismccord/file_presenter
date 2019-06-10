const eventReducer = (state, {event, payload}) => {
  switch (event) {
    case 'phx_reply':
      return {...state, tree: payload.response.tree}
    case 'get_file':
      return {...state, content: payload};
    default:
      return state
  }
}

export default eventReducer;
