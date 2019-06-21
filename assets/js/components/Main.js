import React, { Component } from 'react';
import PrismHighlight from './preview/Highlight';
import ImageView from './preview/ImageView';
import TopMainHeader from './TopMainHeader';
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

  renderMainArea = () => {
    const { selectedTheme } = this.state;
    const { path, content } = this.props.file;
    const ext = fileExtension(path);
    const lang = map.languages(ext)[0];
    if (ext == 'png') {
      return <ImageView content={content} />
    } else {
      return <PrismHighlight theme={selectedTheme} content={content || 'Select any file'} lang={lang}/>
    }
  }

  render() {
    const { selectedTheme } = this.state;
    const options = [
      { value: 'dracula', label: 'Dracula' },
      { value: 'nighOwl', label: 'Night Owl' },
      { value: 'duotoneDark', label: 'Duo Tone Dark'},
      { value: 'duotoneLight', label: 'Duo Tone Light'},
      { value: 'oceanicNext', label: 'Oceanic Next'},
      { value: 'shadesOfPurple', label: 'Shades of Purple'},
      { value: 'ultramin', label: 'Ultramin'},
      { value: 'vsDark', label: 'VS Dark' },
      { value: 'vsDarkPlus', label: 'VS Dark Plus' }
    ];
    const { path, content } = this.props.file;
    const ext = fileExtension(path);
    const lang = map.languages(ext)[0];
    return (
      <div className="main">
        <div className="content-file">
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
          <TopMainHeader path={path} lang={lang}/>
          {this.renderMainArea()}
        </div>
      </div>
    )
  }
}

export default Main;
