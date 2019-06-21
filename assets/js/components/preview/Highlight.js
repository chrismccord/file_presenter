import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer'
import getTheme from '../../lib/theme_factorial'

const PrismHighlight = ({content, lang, theme}) => {
  const themeObj = getTheme(theme.value);
  return (
    <Highlight {...defaultProps} theme={themeObj} code={content || ""} language={lang}>
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
  )
}

export default PrismHighlight;
