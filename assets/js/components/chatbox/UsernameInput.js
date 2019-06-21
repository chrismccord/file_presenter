import React from 'react';

const UsernameInput = ({ setUsername, username }) => {
  return (
    <input className='nice-input username' disabled={true} type='text' value={username} onChange={(event) => setUsername(event.target.value)}/>
  )
}

export default UsernameInput;
