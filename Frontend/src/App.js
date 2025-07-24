import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css'


const socket = io('http://localhost:5000');

const Text = () => {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(''); 
  const messagesEndRef = useRef(null);


  useEffect(() => {
    const fetchedUsername = 'JohnDoe'; 
    setUsername(fetchedUsername);
  }, []);


  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });


    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      username,
      text: message,
      timestamp: new Date().toISOString(),
    };
    socket.emit('sendMessage', newMessage); 
    setMessages((prev) => [...prev, newMessage]); 
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.username === username ? 'sent' : 'received'}`}
          >
            <p className="message-username">{msg.username}</p>
            <p className="message-text">{msg.text}</p>
            <p className="message-timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="message-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="btn btn-send">Send</button>
      </form>
    </div>
  );
};

export default Text;
