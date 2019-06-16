import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  return (
    <div id='login-wrapper'>
      <div className="wrapper">
        <span>Type your name:</span>
        <input className='nice-input' onChange={(e) => setUsername(e.target.value)} value={username}/>
        {username &&
          <Link className='nice-button' to={{
              pathname: 'app',
              state: {
                username
              }
            }}>
            <span>Join</span>
          </Link>}
      </div>
    </div>
  )
}

export default Login;
