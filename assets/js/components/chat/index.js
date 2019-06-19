import React, { useState } from 'react';
import { useChannel } from 'use-phoenix-channel';
import Const from '../../const/channels';
import eventChatReducer from '../../reducers/eventChatReducer';
import { SocketProvider } from 'use-phoenix-channel'
import Message from './Message';

function ChatContainer() {
  const [state, broadcast] = useChannel(Const.CHATCHANNELNAME, eventChatReducer, {messages: [], message: {}})
  return (
    <div id='chat-container'>
      {state.messages && state.messages.reverse().map((message, index) => {
        return <Message onDelete={(message) => {
            broadcast('delete_message', {id: message.id});
          }} message={message} key={index}/>
      })}
    </div>
  )
}

export default ChatContainer;
