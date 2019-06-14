import React, { Component } from 'react';
import PrismHighlight from './highlight';
import TopMainHeader from './top_main_header';

import fileExtension from 'file-extension';
import map from 'lang-map';

class Main extends Component {

  render() {
    const { path, content } = this.props.file;
    const ext = fileExtension(path);
    const lang = map.languages(ext)[0];
    return (
      <div className="main">
        <div className="content-file">
          <TopMainHeader path={path} lang={lang}/>
          <PrismHighlight content={content || 'Select any file'} lang={lang}/>
        </div>
      </div>
    )
  }
}

export default Main;
