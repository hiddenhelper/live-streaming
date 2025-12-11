import React, { useState, useRef, useEffect } from 'react';

const initialMessages = [
  {
    id: 1,
    username: 'User123',
    message: 'Welcome to the stream! 🎉',
    time: '2:30 PM',
    avatar: 'U',
  },
  {
    id: 2,
    username: 'Viewer456',
    message: 'Great content! Keep it up!',
    time: '2:31 PM',
    avatar: 'V',
  },
  {
    id: 3,
    username: 'Streamer789',
    message: 'Thanks everyone for watching!',
    time: '2:32 PM',
    avatar: 'S',
  },
];

function ChatSection() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isOnline, setIsOnline] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !isOnline) return;

    const newMessage = {
      id: messages.length + 1,
      username: 'You',
      message: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'Y',
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isOnline) {
      handleSendMessage();
    }
  };

  return (
    <section className="dashboard-section chat-section">
      <div className="section-header">
        <h2>Live Chat</h2>
        <div className="chat-status">
          <span className={`status-indicator ${isOnline ? 'online' : ''}`}></span>
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>
      <div className="section-content">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className="chat-message">
                <div className="message-avatar">{msg.avatar}</div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-username">{msg.username}</span>
                    <span className="message-time">{msg.time}</span>
                  </div>
                  <div className="message-text">{msg.message}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={!isOnline}
            />
            <button
              className="chat-send-btn"
              onClick={handleSendMessage}
              disabled={!isOnline || !inputValue.trim()}
            >
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatSection;

