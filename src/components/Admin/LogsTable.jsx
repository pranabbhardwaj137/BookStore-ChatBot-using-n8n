import React, { useEffect, useState } from 'react';
import { fetchLogs } from '../../services/api';
import { MessageSquare, AlertCircle } from 'lucide-react';

const LogsTable = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchLogs();
            setLogs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getIntentColor = (intent) => {
        const intentLower = intent?.toLowerCase();
        switch (intentLower) {
            case 'book_search':
                return 'bg-blue-100 text-blue-800';
            case 'payment':
                return 'bg-purple-100 text-purple-800';
            case 'track':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton h-16 w-full"></div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle size={48} className="text-red-500 mb-4" />
                <p className="text-red-600 font-semibold">{error}</p>
                <button
                    onClick={loadLogs}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-smooth"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Session ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Timestamp</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">User Message</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Bot Response</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Intent</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {logs.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                <MessageSquare size={48} className="mx-auto mb-2 text-gray-400" />
                                No chat logs found
                            </td>
                        </tr>
                    ) : (
                        logs.map((log, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-smooth">
                                <td className="px-6 py-4 text-sm font-mono text-gray-800 whitespace-nowrap">
                                    {log.session_id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                                    {log.timestamp}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate">
                                    {log.user_message}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                    {log.bot_response}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getIntentColor(log.intent)}`}>
                                        {log.intent}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LogsTable;
