import React from 'react';

const TypingIndicator = () => {
    return (
        <div className="flex justify-start mb-4">
            <div className="bg-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-md">
                <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full typing-dot"></div>
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;
