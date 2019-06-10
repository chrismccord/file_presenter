const eventReducer = (state, {event, payload}) => {

  switch (event) {
    case 'phx_reply':
      return {...state, tree: payload.response.tree}
    case 'get_file':
      return {...state, content: payload};
    case 'update_file':
      return {...state, content: payload};
    case 'update_tree':
      return {...state, tree: payload.tree}
    default:
      return state
  }
}

export default eventReducer;
