import React, { useState } from 'react';
import Sidebar from './sidebar'
import Main from './main'
import { useChannel } from 'use-phoenix-channel'
import Const from '../const/channels';
import eventReducer from '../reducers/eventReducer';
import Chat from './chat'
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

const Root = ({ location }) => {
  if (!location.state) return <Redirect to='/'/>
  const { username } = location.state;
  return (
    <div>
      <App />
      <Chat user={username}/>
    </div>
  )
}

export default Root;
