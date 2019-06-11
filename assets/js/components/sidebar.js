import React, { useState } from 'react';
import FSRoot from 'react-fs-tree'
//
// const Sidebar = () => {
//   return (
//     <aside className="sidebar">
//       <FSRoot childNodes={[
//       { name: 'file' },
//       { name: 'added file', mode: 'a' },
//       { name: 'deleted file', mode: 'd' },
//       { name: 'modified file', mode: 'm' },
//       { name: 'folder', childNodes: [
//         { name: 'foo' },
//         { name: 'bar' },
//         { name: 'baz' },
//       ] },
//     ]} />
//     </aside>
//   )
// }

const Sidebar = ({tree, onClickFile, onSearch}) => {
  const [query, setQuery] = useState('');
  return (
    <aside className="sidebar">
      <div className="search-box">
        <input type="text" placeholder="Search..." value={query} onChange={(event) => {
            const text = event.target.value;
            setQuery(text);
            onSearch(text);
          }}/>
      </div>
      <ul>
        {tree.map((file, i) => {
          return (
            <li className="file" key={file + i}>
              <a href="#" onClick={(event) => {
                event.preventDefault();
                onClickFile(file)
              }}>{file}</a>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar;
