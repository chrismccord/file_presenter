import React from 'react';

const Sidebar = ({tree, onClickFile}) => {
  return (
    <aside className="sidebar">
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
