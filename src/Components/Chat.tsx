import React, { useState } from 'react';
import '../Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    const sendMessage = async () => {
        if (messageInput.trim() === '') return;

        const userMessage = {
            sender: 'user',
            text: messageInput.trim()
        };

        setMessages([...messages, userMessage]);
        setMessageInput('');

        try {
            const response = await fetch('/api/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage.text })
            });
            const data = await response.json();
            const botMessage = {
                sender: 'bot',
                text: data.response
            };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                sender: 'bot',
                text: 'Sorry, something went wrong.'
            };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div id="chat-container">
            <div id="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div id="input-container">
                <input
                    type="text"
                    id="message-input"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button id="send-button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;

