import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Send } from 'lucide-react';

const ChatInput = ({ onSend, disabled }) => {
    const [input, setInput] = useState('');

    const quickPrompts = [
        { label: '📚 Show Fantasy Books', text: 'Show fantasy books' },
        { label: '🚚 Track Order', text: 'Track my order' },
        { label: '💳 Payment Methods', text: 'What payment methods do you support?' },
        { label: '📦 Delivery Charges', text: 'What are the delivery charges?' },
        { label: '📚 Book details', text: 'Do you have Atomic Habits?' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input.trim());
            setInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="sticky bottom-0 bg-white border-t border-gray-200 p-4 shadow-lg"
        >


            <div className="max-w-4xl mx-auto space-y-3">
                <div className="flex flex-wrap gap-2">
                    {quickPrompts.map((prompt) => (
                        <button
                            key={prompt.label}
                            type="button"
                            onClick={() => setInput(prompt.text)}
                            disabled={disabled}
                            className="px-3 py-1.5 text-sm rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {prompt.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        disabled={disabled}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-smooth"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || disabled}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed transition-smooth shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </form>
    );
};

ChatInput.propTypes = {
    onSend: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

ChatInput.defaultProps = {
    disabled: false,
};

export default ChatInput;
