import React from 'react';
import Highlight from 'react-highlight'
import fileExtension from 'file-extension';
import map from 'lang-map';

const Main = ({file}) => {
  const { path, content } = file;
  const ext = fileExtension(path);
  const lang = map.languages(ext);
  return (
    <div className="main">
    <Highlight className={`language-${lang}`}>
      {content}
    </Highlight>
    </div>
  )
}

export default Main;
