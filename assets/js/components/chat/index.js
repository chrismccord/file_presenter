import React, { useState } from 'react';
import { useChannel } from 'use-phoenix-channel';
import Const from '../../const/channels';
import eventChatReducer from '../../reducers/eventChatReducer';
import { SocketProvider } from 'use-phoenix-channel'
import Message from './Message';
import MessageImage from './MessageImage';

function ChatContainer() {
  const [state, broadcast] = useChannel(Const.CHATCHANNELNAME, eventChatReducer, {messages: [], message: {}})
  return (
    <div className="chat-wrapper">
      <div id="chat-members">
        <ul>
          <li>Hola</li>
        </ul>
      </div>
      <div id='chat-container'>
        <a href='#/app'>
          Live
        </a>
        {state.messages && state.messages.reverse().map((message, index) => {
          if (message.base) {
            return <MessageImage key={index} onDelete={() => {
                console.log('Deleted');
              }} message={message} />
          }
          return <Message key={index} onDelete={(message) => {
              broadcast('delete_message', {id: message.id});
            }} message={message} key={index}/>
        })}
      </div>
    </div>
  )
}

export default ChatContainer;
