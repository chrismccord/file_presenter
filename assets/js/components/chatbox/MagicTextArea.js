import React from 'react';

const MagicTextArea = ({ setText, broadcast, size, text, username }) => {
  return (
    <textarea onPaste={(event) => {
      const file = event.clipboardData.items[0];
      if (file.type == 'image/png') {
        var data = file.getAsFile();
        var fr = new FileReader;
        fr.onloadend = function() {
            const base = fr.result;
            broadcast('new_image', {username, base});
        };
        fr.readAsDataURL(data);
      }
      }} className={`tx-size-${size} nice-input chat-text`} onChange={(event) => {
        setText(event.target.value)
      }} onKeyDown={(event) => {
        if (size == 'small') {
          if(event.key == 'Enter') {
            broadcast('new_message', {username, text});
            setText('')
          }
        }
      }} value={text}></textarea>
  )
}

export default MagicTextArea;
