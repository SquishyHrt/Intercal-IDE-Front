import { useState } from 'react';
import React from 'react';
import '../style/Chat.css';
import { useTranslation } from 'react-i18next';

const Chat = () => {
    const { t } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    const sendMessage = async () => {
        console.log("Send button clicked");
        if (messageInput.trim() === '') return;

        const userMessage = {
            sender: 'user',
            text: messageInput.trim()
        };

        console.log("User message:", userMessage);

        setMessages([...messages, userMessage]);
        setMessageInput('');

        try {
            console.log("Sending message to backend:", userMessage.text);
            const response = await fetch('http://localhost:8081/api/message', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: userMessage.text})
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Received response from backend:", data);

            const botMessage = {
                sender: 'bot',
                text: data.response
            };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error during fetch:', error);
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
                <button id="send-button" onClick={sendMessage}>{t('send')}</button>
            </div>
        </div>
    );
};

export default Chat;

