import React, { useState } from 'react';

export default function ChatInput({ onSubmit }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;
    onSubmit(message);
    setMessage('');
  };

  return (
      <div className='chat-palette'>
        <div className='formatting-buttons'>
          <button type="button">
            <i className="fas fa-bold"></i>
          </button>
          <button type="button">
            <i className="fas fa-italic"></i>
          </button>
          <button type="button">
            <i className="fas fa-underline"></i>
          </button>         
          <button type="button">
            <i className="fas fa-smile"></i>
          </button>
        </div>
        <div className='input-container'>
          <input
            value={message}
            placeholder="Send a message..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSubmit} type="button">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
  );
}
