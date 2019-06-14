import React, { Component } from 'react';
import PrismHighlight from './highlight';
import TopMainHeader from './top_main_header';
import Select from 'react-select';

import fileExtension from 'file-extension';
import map from 'lang-map';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTheme: {
        value: 'ultramin',
        label: 'Default'
      },
    }
  }
  render() {
    const options = [
      { value: 'dracula', label: 'Dracula' },
      { value: 'vsDark', label: 'VS Dark' },
      { value: 'nighOwl', label: 'Night Owl' },
    ];
    const { selectedTheme } = this.state;
    const { path, content } = this.props.file;
    const ext = fileExtension(path);
    const lang = map.languages(ext)[0];
    return (
      <div className="main">
        <div className="content-file">
          <TopMainHeader path={path} lang={lang}/>
            <Select
              value={selectedTheme}
              onChange={(event) => {
                this.setState({
                  selectedTheme: event
                });
              }}
              placeholder='Select a theme'
              options={options}
            />
        <PrismHighlight theme={selectedTheme} content={content || 'Select any file'} lang={lang}/>
        </div>
      </div>
    )
  }
}

export default Main;
