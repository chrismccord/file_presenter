import React, { useState } from 'react';
import { useChannel } from 'use-phoenix-channel'
import Const from '../const/channels';
import eventChatReducer from '../reducers/eventChatReducer';

function Chat({user}) {
  const [state, broadcast] = useChannel(Const.CHATCHANNELNAME, eventChatReducer, {messages: []})
  const [text, setText] = useState('');
  const [size, setSize] = useState('small');
  const [username, setUsername] = useState(user);
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <div id="chat" className={`is-chat-open-${isChatOpen}`}>
      <a href='#' onClick={(event) => {
          event.preventDefault();
          setIsChatOpen(!isChatOpen)
        }} id="close-chat">
        {isChatOpen ? 'X' : '^'}
      </a>
      <div className='chat-sizes'>
        <div className='size-w' onClick={() => setSize('small')}>
          <span className='size size-small'></span>
        </div>
        <div className='size-w' onClick={() => setSize('medium')}>
          <span className='size size-medium'></span>
        </div>
        <div className='size-w' onClick={() => setSize('large')}>
          <span className='size size-large'></span>
        </div>
      </div>
      <input className='nice-input username' disabled={true} type='text' value={username} onChange={(event) => setUsername(event.target.value)}/>
      <textarea className={`tx-size-${size} nice-input chat-text`} onChange={(event) => {
          setText(event.target.value)
        }} onKeyDown={(event) => {
          if (size == 'small') {
            if(event.key == 'Enter') {
              broadcast('new_message', {username, text});
              setText('')
            }
          }
        }} value={text}></textarea>
      <span className="chat-instructions">```code```</span>
      {(size != 'small') &&
        <button onClick={() => {
            if (text) {
              broadcast('new_message', {username, text})
              setText('')
            }
          }}>Send</button>
      }
    </div>
  )
}

export default Chat;
