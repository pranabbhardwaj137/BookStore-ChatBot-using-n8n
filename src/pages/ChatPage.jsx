import React, { useState, useEffect } from 'react';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import { sendMessage, generateSessionId } from '../services/api';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        // Generate session ID on component mount
        const newSessionId = generateSessionId();
        setSessionId(newSessionId);
        console.log('Session ID:', newSessionId);
    }, []);

    const handleSendMessage = async (userMessage) => {
        // Add user message to chat
        const userMsg = {
            text: userMessage,
            isUser: true,
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);

        // Set loading state
        setLoading(true);

        try {
            // Send message to API
            const response = await sendMessage(userMessage, sessionId);

            // Add bot response to chat
            const botMsg = {
                // n8n webhook returns { bot_response, intent, ... }
                text: response.bot_response || response.reply || 'Sorry, I could not process your request.',
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error('Error sending message:', error);

            // Add error message to chat
            const errorMsg = {
                text: 'Sorry, something went wrong. Please try again later.',
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex flex-col h-screen"
            style={{
                backgroundImage:
                    'url("https://media.istockphoto.com/id/2150398775/vector/shining-magic-book-an-open-paper-book-glows-and-sparkles.jpg?s=612x612&w=0&k=20&c=ZfT_DaI7xdi0e2vamqjVZytjfvRhKmvVsLtyrU6n2Xs=")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="flex flex-col h-full flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
                <ChatWindow messages={messages} isLoading={loading} />
                <ChatInput onSend={handleSendMessage} disabled={loading} />
            </div>
        </div>
    );
};

export default ChatPage;
