import React from 'react';
import PropTypes from 'prop-types';

const MessageBubble = ({ message, isUser, timestamp }) => {
    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
            <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-md transition-smooth ${isUser
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
            >
                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                    {message}
                </p>
                <p
                    className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'
                        }`}
                >
                    {formatTime(timestamp)}
                </p>
            </div>
        </div>
    );
};

MessageBubble.propTypes = {
    message: PropTypes.string.isRequired,
    isUser: PropTypes.bool.isRequired,
    timestamp: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]).isRequired,
};

export default MessageBubble;
