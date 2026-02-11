# Bookstore Chatbot Frontend

A modern, responsive React + Vite application for a bookstore chatbot automation system with customer chat interface and admin dashboard.

## Features

### Customer Chat Interface
- WhatsApp-like messaging UI
- Real-time bot responses
- Typing indicators
- Auto-scroll to latest message
- Session-based conversations
- Timestamp for each message

### Admin Dashboard
- **Books Management**: View all books with title, author, genre, price, and stock
- **Orders Tracking**: Monitor orders with status and delivery dates
- **Chat Logs**: Review conversation history with intent classification

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- n8n backend running at `http://localhost:5678`

## Installation

1. Navigate to the project directory:
```bash
cd bookstore-chatbot-frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
bookstore-chatbot-frontend/
├── src/
│   ├── components/
│   │   ├── ChatWindow.jsx          # Message list container
│   │   ├── MessageBubble.jsx       # Individual message component
│   │   ├── ChatInput.jsx           # Message input field
│   │   ├── TypingIndicator.jsx    # Loading animation
│   │   └── Admin/
│   │       ├── BooksTable.jsx      # Books data table
│   │       ├── OrdersTable.jsx     # Orders data table
│   │       └── LogsTable.jsx       # Chat logs table
│   ├── pages/
│   │   ├── ChatPage.jsx            # Main chat interface
│   │   └── AdminPage.jsx           # Admin dashboard
│   ├── services/
│   │   └── api.js                  # API service layer
│   ├── App.jsx                     # Root component with routing
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## API Endpoints

The application expects the following n8n webhook endpoints:

- `POST /webhook/chat` - Send chat messages
  - Payload: `{ message: string, sessionId: string }`
  - Response: `{ reply: string, intent: string }`

- `GET /webhook/books` - Fetch books
  - Response: `[{ title, author, genre, price, stock }]`

- `GET /webhook/orders` - Fetch orders
  - Response: `[{ orderId, customer, status, deliveryDate }]`

- `GET /webhook/logs` - Fetch chat logs
  - Response: `[{ userMessage, botReply, intent, time }]`

## Usage

### Chat Interface

1. Navigate to the home page (`/`)
2. Type your message in the input field
3. Press Enter or click the send button
4. View bot responses in real-time

### Admin Dashboard

1. Navigate to `/admin`
2. Switch between tabs:
   - **Books**: View all available books
   - **Orders**: Track customer orders
   - **Chat Logs**: Review conversation history

## Features in Detail

### Session Management
- Unique session ID generated for each user
- Maintains conversation context
- Stored in component state

### Error Handling
- API error messages displayed to users
- Retry functionality for failed requests
- Fallback messages for network issues

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

### Loading States
- Skeleton loaders for tables
- Typing indicators for chat
- Disabled states during API calls

## Customization

### Changing API Base URL

Edit `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url';
```

### Styling

Modify `tailwind.config.js` for theme customization:
```javascript
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ }
    }
  }
}
```

## Troubleshooting

### CORS Issues
Ensure your n8n backend allows requests from `http://localhost:5173`

### API Connection Failed
1. Verify n8n is running at `http://localhost:5678`
2. Check webhook endpoints are configured
3. Review browser console for errors

### Build Errors
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear Vite cache: `npm run dev -- --force`

## License

MIT

## Support

For issues or questions, please check the documentation or contact support.
# BookStore-ChatBot-using-n8n
