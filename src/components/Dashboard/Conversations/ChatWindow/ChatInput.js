import React, { useState } from 'react';

export default function ChatInput({ onSubmit }) {
  const [message, setMessage] = useState('');
  const [formats, setFormats] = useState({ bold: false, italic: false, underline: false });

  const toggleFormat = (e, format) => {
    e.preventDefault() 
    setFormats(prevFormats => ({ ...prevFormats, [format]: !prevFormats[format] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    onSubmit(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='chat-palette'>
        <div className='formatting-buttons'>
          <button onClick={(e) => toggleFormat(e, 'bold')} style={{ fontWeight: formats.bold ? 'bold' : 'normal' }}>B</button>
          <button onClick={(e) => toggleFormat(e, 'italic')} style={{ fontStyle: formats.italic ? 'italic' : 'normal' }}>I</button>
          <button onClick={(e) => toggleFormat(e, 'underline')} style={{ textDecoration: formats.underline ? 'underline' : 'none' }}>U</button>
        </div>
        <div className='input-container'>
          <input
            value={message}
            placeholder="Send a message..."
            onChange={(e) => setMessage(e.target.value)}
            style={{
              fontWeight: formats.bold ? 'bold' : 'normal',
              fontStyle: formats.italic ? 'italic' : 'normal',
              textDecoration: formats.underline ? 'underline' : 'none',
            }}
          />
          <button type="submit">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </form>
  );
}
