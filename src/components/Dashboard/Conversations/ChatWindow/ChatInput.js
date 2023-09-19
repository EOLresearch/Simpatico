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
    <form onSubmit={handleSubmit}>
      <div className='chat-palette'>

        <div className='input-container'>
          <input
            value={message}
            placeholder="Send a message..."
            onChange={(e) => setMessage(e.target.value)}

          />
          <button type="submit">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </form>
  );
}
