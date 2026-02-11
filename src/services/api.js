import axios from 'axios';

const API_BASE_URL = 'http://localhost:5678/webhook/bookstore-chat';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
});

// Simple in-memory caches so we don't re-hit n8n
let booksCache = null;
let ordersCache = null;
let logsCache = null;

// Request interceptor for debugging
api.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.data);
        return response;
    },
    (error) => {
        console.error('Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

/**
 * Send a chat message to the bot
 * @param {string} message - User message
 * @param {string} sessionId - Session ID
 * @returns {Promise<Object>} Bot response with reply and intent
 */
export const sendMessage = async (message, sessionId) => {
    try {
        const response = await api.post('/', {
            message,
            sessionId,
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            'Failed to send message. Please try again.'
        );
    }
};

/**
 * Fetch all books from the database
 * @returns {Promise<Array>} List of books
 */
export const fetchBooks = async () => {
    try {
        if (booksCache) {
            return booksCache;
        }
        // Uses the same base URL as chat: http://localhost:5678/webhook/bookstore-chat
        // Final URL: http://localhost:5678/webhook/bookstore-chat/books
        const response = await api.get('/books');
        const data = response.data;
        // n8n typically wraps results as an array of items: [{ success, books: [...] }]
        if (Array.isArray(data)) {
            const first = data[0] || {};
            booksCache = first.books || [];
            return booksCache;
        }
        // Fallback if backend shape changes
        booksCache = data.books || [];
        return booksCache;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            'Failed to fetch books. Please try again.'
        );
    }
};

/**
 * Fetch all orders from the database
 * @returns {Promise<Array>} List of orders
 */
export const fetchOrders = async () => {
    try {
        if (ordersCache) {
            return ordersCache;
        }
        // Final URL: http://localhost:5678/webhook/bookstore-chat/orders
        const response = await api.get('/orders');
        const data = response.data;
        if (Array.isArray(data)) {
            const first = data[0] || {};
            ordersCache = first.orders || [];
            return ordersCache;
        }
        ordersCache = data.orders || [];
        return ordersCache;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            'Failed to fetch orders. Please try again.'
        );
    }
};

/**
 * Fetch chat logs
 * @returns {Promise<Array>} List of chat logs
 */
export const fetchLogs = async () => {
    try {
        // Only use cache if we actually have logs stored
        if (Array.isArray(logsCache) && logsCache.length > 0) {
            return logsCache;
        }

        const response = await api.get('/logs');
        const data = response.data;

        let logs = [];

        if (Array.isArray(data)) {
            const first = data[0] || {};

            // Case 1: [{ success, logs: [...] }]
            if (Array.isArray(first.logs)) {
                logs = first.logs;
            }
            // Case 2: n8n default: [{ json: { ... }}, ...]
            else if (first.json) {
                logs = data.map((item) => item.json);
            }
            // Case 3: array of plain log objects already
            else if (first.session_id || first.user_message || first.bot_response) {
                logs = data;
            }
        } else if (Array.isArray(data.logs)) {
            // Case 4: { logs: [...] }
            logs = data.logs;
        } else if (Array.isArray(data.chats)) {
            // Case 5: { success, chats: [...] }  (your current n8n shape)
            logs = data.chats;
        }

        logsCache = logs;
        return logsCache;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            'Failed to fetch logs. Please try again.'
        );
    }
};

/**
 * Generate a unique session ID
 * @returns {string} UUID v4
 */
export const generateSessionId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export default api;
