import React from 'react';
import Moment from 'react-moment';

const MessageImage = ({ message, onDelete }) => {
  const { username } = message;
  const now = Date.now();
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
      <div className="image-preview">
        <img src={message.base} />
      </div>
    </div>
  )
}


export default MessageImage;
