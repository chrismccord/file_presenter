import React, { useState } from 'react';

const Aside = ({type, currentPath, tree, onClickFile, onSearch}) => {
  const [query, setQuery] = useState('');
  return (
    <aside className="sidebar">
      <div className="search-box">
        <input type="text" className="search-input" placeholder="Search..." value={query} onChange={(event) => {
            const text = event.target.value;
            setQuery(text);
            onSearch(text);
          }}/>
      </div>
      <ul>
        {tree && tree.map((file, i) => {
          const isActive = currentPath == file;
          return (
            <li className="file" key={file + i}>
              <a href="#/" className={`is-current-path-${isActive}`} onClick={(event) => {
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

export default Aside;
