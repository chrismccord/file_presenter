import React, { useState } from 'react';
import { useChannel } from 'use-phoenix-channel'
import Const from '../../const/channels';
import eventChatReducer from '../../reducers/eventChatReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import SizeOptions from './SizeOptions';
import MagicTextArea from './MagicTextArea';
import UsernameInput from './UsernameInput';

function ChatBox({user}) {
  const [state, broadcast] = useChannel(Const.CHATCHANNELNAME, eventChatReducer, {messages: []})
  const [text, setText] = useState('');
  const [size, setSize] = useState('small');
  const [username, setUsername] = useState(user);
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <div id="chat" className={`is-chat-open-${isChatOpen}`}>
      <div className="chat-top-options">
        <a href='#/chat' className="chat-option chat-link">
          <FontAwesomeIcon icon={faComments} />
        </a>
        <SizeOptions className='chat-option' setSize={setSize}/>
      </div>
      <div className="chat-square">
        <a href='#' onClick={(event) => {
            event.preventDefault();
            setIsChatOpen(!isChatOpen)
          }} id="close-chat">
          {isChatOpen ? 'X' : '^'}
        </a>
        <UsernameInput username={username} setUsername={setUsername}/>
        <MagicTextArea setText={setText} broadcast={broadcast} size={size} text={text} username={username}/>
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
    </div>
  )
}

export default ChatBox;
