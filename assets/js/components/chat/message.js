import React from 'react';
import Moment from 'react-moment';
import PrismHighlight from '../highlight';
const Message = ({message}) => {
  const { username, text } = message;
  const now = Date.now();
  const dateToFormat = '1976-04-19T12:59-0500';
  return (
    <div className='message-container'>
      <div className="top-message-container">
        <span className="username">{username}</span>
        <div className="time">
          <Moment interval={3000} fromNow ago>{now}</Moment>
        </div>
      </div>
      <PrismHighlight content={text} theme={{value: 'dracula'}}/>
    </div>
  )
}

export default Message;
