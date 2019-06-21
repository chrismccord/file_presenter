import React from 'react';

const SizeOptions = ({ setSize }) => {
  return (
    <div className='chat-sizes'>
      <div className='size-w' onClick={() => setSize('small')}>
        <span className='size size-small'></span>
      </div>
      <div className='size-w' onClick={() => setSize('medium')}>
        <span className='size size-medium'></span>
      </div>
      <div className='size-w' onClick={() => setSize('large')}>
        <span className='size size-large'></span>
      </div>
    </div>
  )
}

export default SizeOptions;
