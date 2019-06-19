import React from 'react';

const TopMainHeader = ({path, lang}) => {

  return (
    <div className="top-wrapper">
      <span className="path-name">{path}</span>
      {lang && <span className="lang-name">{lang}</span>}
    </div>
  )
}

export default TopMainHeader;
