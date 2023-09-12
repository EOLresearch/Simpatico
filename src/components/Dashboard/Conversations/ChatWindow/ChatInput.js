import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import axios from 'axios';

export default function ChatInput({ onSendMessage, giphyApiKey }) {
  const [message, setMessage] = useState('');
  const [quill, setQuill] = useState(null);

  // Handle text input change
  const handleTextChange = (value) => {
    setMessage(value);
  };

  // Handle inserting GIF from Giphy
  const handleInsertGif = async () => {
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`
      );

      const gifUrl = response.data.data.image_url;

      if (quill) {
        const range = quill.getSelection();
        quill.clipboard.dangerouslyPasteHTML(range.index, `<img src="${gifUrl}" alt="GIF" />`);
        quill.setSelection(range.index + 1);
      }
    } catch (error) {
      console.error('Error fetching GIF from Giphy:', error);
    }
  };

  // Handle sending the message
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-input">
      <ReactQuill
        ref={(el) => setQuill(el && el.getEditor())}
        value={message}
        onChange={handleTextChange}
        placeholder="Type your message..."
        modules={{
          toolbar: {
            container: [
              ['bold', 'italic', 'underline'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image', 'video'],
              ['clean'],
              ['giphy'], // Custom button for GIF insertion
            ],
            handlers: {
              giphy: handleInsertGif,
            },
          },
        }}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
