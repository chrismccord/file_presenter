import React, { Component } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import fileExtension from 'file-extension';
import map from 'lang-map';

class Main extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    // return this.props.file.path !== nextProps.file.path;
    return true;
  }

  render() {
    const { path, content } = this.props.file;
    const ext = fileExtension(path);
    const lang = map.languages(ext)[0];
    const exampleCode = `
    (function someDemo() {
      var test = "Hello World!";
      console.log(test);
    })();

    return () => <App />;
    `.trim()
    return (
      <div className="main">
        <div className="content-file">
          <div className="top-wrapper">
            <span className="path-name">{path}</span>
            {lang && <span className="lang-name">{lang}</span>}
          </div>
          <Highlight {...defaultProps} theme={theme} code={content || ""} language={lang}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    <span className='line'>{ i + 1 }</span>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </div>
    )
  }
}

export default Main;
