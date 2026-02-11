import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../../services/api';
import { Book, AlertCircle } from 'lucide-react';

const BooksTable = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchBooks();
            setBooks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
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
                    onClick={loadBooks}
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
                        <th className="px-6 py-3 text-left text-sm font-semibold">Book ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Author</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Genre</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {books.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                <Book size={48} className="mx-auto mb-2 text-gray-400" />
                                No books found
                            </td>
                        </tr>
                    ) : (
                        books.map((book, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-smooth">
                                <td className="px-6 py-4 text-sm font-mono text-gray-800">
                                    {book.book_id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800">{book.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{book.genre}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                    {book.price}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800">
                                    {book.stock}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BooksTable;
