import React from 'react';
import ReactDOM from 'react-dom';
import { SocketProvider } from 'use-phoenix-channel'
import Sidebar from './sidebar'
import Main from './main'
import { useChannel } from 'use-phoenix-channel'
import Const from '../const/channels';
import eventReducer from '../reducers/eventReducer';

function App() {
  const [state, broadcast] = useChannel(Const.CHANNELNAME, eventReducer, {tree: [], content: {}})
  return (
    <div>
      <Sidebar tree={state.tree} onClickFile={ (path) => broadcast('get_file', {path}) }/>
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
