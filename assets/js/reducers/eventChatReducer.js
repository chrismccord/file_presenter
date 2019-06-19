const eventChatReducer = (state, {event, payload}) => {
  switch (event) {
    case 'delete_message':
      const { id } = payload;
      state.messages = state.messages.filter((message) => message.id !== id);
      console.log(state);
      return state;
      break;
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
