const eventChatReducer = (state, {event, payload}) => {
  switch (event) {
    case 'new_message':
      state.messages.push(payload.message)
      return {...state};
    case 'phx_reply':
      state.messages = payload.response.messages;
      return {...state}
      break;
    default:
      return state
  }
}

export default eventChatReducer;
