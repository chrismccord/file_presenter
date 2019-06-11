import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { SocketProvider } from 'use-phoenix-channel'
import Sidebar from './sidebar'
import Main from './main'
import { useChannel } from 'use-phoenix-channel'
import Const from '../const/channels';
import eventReducer from '../reducers/eventReducer';

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

const Root = (props) => {
  return (
    <SocketProvider wsUrl='/socket'>
      <App />
    </SocketProvider>
  )
}

const container = document.getElementById('root');
ReactDOM.render(<Root />, container);

export default App;
