import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { SocketProvider } from 'use-phoenix-channel'
import ChatContainer from './chat/index';
import App from './app';
import Login from './login';

const Root = (props) => {
  return (
    <SocketProvider wsUrl='/socket'>
      <Router>
        <Switch>
          <Route path='/' exact component={Login}/>
          <Route path='/app' exact component={App}/>
          <Route path='/chat' exact component={ChatContainer}/>
        </Switch>
      </Router>
    </SocketProvider>
  )
}

const container = document.getElementById('root');
ReactDOM.render(<Root />, container);

export default App;
