import React, { useState } from 'react';
import { useChannel } from 'use-phoenix-channel';
import Const from '../../const/channels';
import eventChatReducer from '../../reducers/eventChatReducer';
import { SocketProvider } from 'use-phoenix-channel'
import Message from './message';

function ChatContainer() {
  const [state, broadcast] = useChannel(Const.CHATCHANNELNAME, eventChatReducer, {messages: [], message: {}})
  return (
    <div id='chat-container'>
      {state.messages && state.messages.reverse().map((message, index) => {
        return <Message message={message} key={index}/>
      })}
    </div>
  )
}

export default ChatContainer;
