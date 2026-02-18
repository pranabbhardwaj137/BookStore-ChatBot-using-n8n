import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import AdminPage from './pages/AdminPage';
import { MessageCircle, LayoutDashboard, BookOpen } from 'lucide-react';

const Navigation = () => {
    const location = useLocation();

    // Don't show navbar on landing page
    if (location.pathname === '/') {
        return null;
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <BookOpen size={28} className="text-blue-600" />
                        <h1 className="text-2xl font-bold text-blue-600">ChatBooks</h1>
                    </Link>
                    <div className="flex space-x-4">
                        <Link
                            to="/chat"
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-smooth ${location.pathname === '/chat'
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <MessageCircle size={20} />
                            <span>Chat</span>
                        </Link>
                        <Link
                            to="/admin"
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-smooth ${location.pathname === '/admin'
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <LayoutDashboard size={20} />
                            <span>Admin</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Navigation />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

