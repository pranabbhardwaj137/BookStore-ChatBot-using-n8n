import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { MessageCircle } from 'lucide-react';

const ChatWindow = ({ messages, isLoading }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    return (
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-4xl mx-auto">
                {messages.length === 0 && !isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20">
                        <MessageCircle size={64} className="text-blue-500 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Welcome to Bookstore Chat
                        </h2>
                        <p className="text-gray-600">
                            Ask me anything about books, orders, or recommendations!
                        </p>
                    </div>
                ) : (
                    <>
                        {messages.map((msg, index) => (
                            <MessageBubble
                                key={index}
                                message={msg.text}
                                isUser={msg.isUser}
                                timestamp={msg.timestamp}
                            />
                        ))}
                        {isLoading && <TypingIndicator />}
                    </>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

ChatWindow.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            isUser: PropTypes.bool.isRequired,
            timestamp: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.instanceOf(Date),
            ]).isRequired,
        })
    ).isRequired,
    isLoading: PropTypes.bool,
};

ChatWindow.defaultProps = {
    isLoading: false,
};

export default ChatWindow;
