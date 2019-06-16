const eventChatReducer = (state, {event, payload}) => {
  switch (event) {
    case 'new_message':
      state.messages.push(payload.message)
      return {...state};
    default:
      return state
  }
}

export default eventChatReducer;
