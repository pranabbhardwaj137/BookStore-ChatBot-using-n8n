import React, { useState } from 'react';
import BooksTable from '../components/Admin/BooksTable';
import OrdersTable from '../components/Admin/OrdersTable';
import LogsTable from '../components/Admin/LogsTable';
import { Book, ShoppingCart, MessageSquare } from 'lucide-react';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('books');

    const tabs = [
        { id: 'books', label: 'Books', icon: Book },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
        { id: 'chats', label: 'Chat Logs', icon: MessageSquare },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'books':
                return <BooksTable />;
            case 'orders':
                return <OrdersTable />;
            case 'chats':
                return <LogsTable />;
            default:
                return <BooksTable />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">Manage books, orders, and view chat logs</p>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-lg shadow-md mb-6 p-2">
                    <div className="flex space-x-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-smooth ${activeTab === tab.id
                                            ? 'bg-blue-500 text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
