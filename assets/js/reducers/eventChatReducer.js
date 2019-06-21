const eventChatReducer = (state, {event, payload}) => {
  console.log(event);
  switch (event) {
    case 'delete_message':
      const { id } = payload;
      state.messages = state.messages.filter((message) => message.id !== id);
      return state;
      break;
    case 'new_message':
      state.messages.push(payload.message)
      return {...state};
    case 'new_image':
      state.messages.push(payload.message);
      return {...state}
    case 'phx_reply':
      state.messages = payload.response.messages;
      return {...state}
      break;
    default:
      return state
  }
}

export default eventChatReducer;
