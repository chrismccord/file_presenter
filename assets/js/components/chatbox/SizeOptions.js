import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'

const SizeOptions = ({ setSize, className }) => {
  const [step, setStepSize] = useState(0);
  return (
    <div className={`${className} chat-sizes`}>
      <span onClick={() => {
          switch (step) {
            case 0:
              setSize('medium')
              setStepSize(1);
              break;
            case 1:
              setSize('large')
              setStepSize(2)
              break;
            default:
              setSize('small')
              setStepSize(0);
          }
        }} className={`chat-option-button step-size-${step}`}>
        <FontAwesomeIcon icon={faExternalLinkSquareAlt} /></span>
    </div>
  )
}

export default SizeOptions;
