import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3001'); // Assuming server is running on port 3001

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    socket.on('message', (message: string) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const sendMessage = () => {
    socket.emit('message', input);
    setInput('');
  };

  return (
    <div className="App">
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
