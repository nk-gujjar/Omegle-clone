// index.tsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

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
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
