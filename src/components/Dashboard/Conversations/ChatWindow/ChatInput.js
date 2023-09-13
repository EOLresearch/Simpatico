import React, { useState } from 'react';

export default function ChatInput({ onSubmit }) {
  const [messageBody, setMessageBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageBody.trim() === '') return;
    onSubmit(messageBody);
    setMessageBody('');
  };

  test
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={messageBody}
        placeholder="Send a message..."
        onChange={(e) => setMessageBody(e.target.value)}
      />
      <button type="submit">
        <i className="fas fa-paper-plane"></i>
      </button>
    </form>
  );
}
