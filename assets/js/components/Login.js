import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const Login = ({ location, history }) => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const isUsernameFilled = (username) ? false : true;
  const classes = classnames('nice-button', {disabled: isUsernameFilled});
  return (
    <div id='login-wrapper'>
      <div className="wrapper">
        <span>Type your name:</span>
        <input className='nice-input' onChange={(e) => setUsername(e.target.value)} value={username}/>
          <Link className={classes} onClick={(event) => {
              if(isUsernameFilled) {
                event.preventDefault();
              }
              localStorage.setItem('username', username);
            }} to={{
              pathname: 'app',
              state: {
                username
              }
            }}>
            <span>Join</span>
          </Link>
      </div>
    </div>
  )
}

export default Login;
