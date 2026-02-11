import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../../services/api';
import { ShoppingCart, AlertCircle } from 'lucide-react';

const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchOrders();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const statusLower = status?.toLowerCase();
        switch (statusLower) {
            case 'completed':
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'pending':
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'cancelled':
            case 'failed':
                return 'bg-red-100 text-red-800';
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
                    onClick={loadOrders}
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
                        <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Customer Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Book ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Quantity</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Order Date</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Delivery Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                <ShoppingCart size={48} className="mx-auto mb-2 text-gray-400" />
                                No orders found
                            </td>
                        </tr>
                        ) : (
                            orders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-smooth">
                                    <td className="px-6 py-4 text-sm font-mono text-gray-800">
                                        {order.order_id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {order.customer_name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {order.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {order.book_id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">
                                        {order.quantity}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {order.order_date}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {order.delivery_date}
                                    </td>
                                </tr>
                            ))
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
