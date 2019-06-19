import React from 'react';

const ImageView = ({ content }) => {
  return (
    <div className="image-preview">
      <img src={`data:image/png;base64, ${content}`}/>
    </div>
  )
}

export default ImageView;
