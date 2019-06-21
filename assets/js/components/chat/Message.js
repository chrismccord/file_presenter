import React from 'react';
import Moment from 'react-moment';
import PrismHighlight from '../preview/Highlight';
import isSnippet from '../../lib/message_factorial';


const Message = ({message, onDelete}) => {
  const { username, text } = message;
  const now = Date.now();

  let snippetText = text;
  if(isSnippet(text)) {
    snippetText = text.trim().substring(3, text.length);
    snippetText = snippetText.substring(0, snippetText.length - 3);
  }
  return (
    <div className='message-container'>
      <div className="single-chat-options">
        <a href="#" className="delete-link" onClick={(event) => {
            event.preventDefault();
            onDelete(message)
          }}>
          Delete
        </a>
      </div>
      <div className="top-message-container">
        <span className="username">{username}</span>
        <div className="time">
          <Moment interval={3000} fromNow ago>{now}</Moment>
        </div>
      </div>
      {isSnippet(text) ? (
        <PrismHighlight content={snippetText} theme={{value: 'dracula'}}/>
      ) : (
        <span>{text}</span>
      )}
    </div>
  )
}

export default Message;
