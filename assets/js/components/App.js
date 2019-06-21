import React, { Fragment, useState } from 'react';
import Sidebar from './Sidebar'
import Main from './Main'
import { useChannel } from 'use-phoenix-channel'
import Const from '../const/channels';
import eventReducer from '../reducers/eventReducer';
import ChatBox from './chatbox/ChatBox';
import { Redirect } from 'react-router-dom';

function App() {
  const [state, broadcast] = useChannel(Const.CHANNELNAME, eventReducer, {tree: [], content: {}})
  const [tree, setTree] = useState([]);
  let items = (tree.length > 0) ? tree : state.tree;
  return (
    <div>
      <Sidebar tree={items}
        onClickFile={ (path) => broadcast('get_file', {path}) }
        onSearch={ (query) => {
          const regex = new RegExp(query, 'g');
          const filtered = state.tree.filter((item, index) => item.match(regex))
          setTree(filtered);
        }}/>
      <Main file={state.content}/>
    </div>
  )
}

const Root = ({ history }) => {
  const username = localStorage.getItem('username');
  if(!username) {
    history.replace('/');
    return null;
  }
  return (
    <Fragment>
      <App />
      <ChatBox user={username}/>
    </Fragment>
  )
}

export default Root;
