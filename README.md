# Bookstore Rule‑Based Chatbot (Frontend)

A modern React + Vite frontend for a **rule‑based chatbot for bookstore management**, backed by **n8n workflows**.

The app has:
- a **marketing landing page** to showcase the system,
- a **chat interface** where users talk to the rule‑based bot,
- an **admin dashboard** that visualizes books, orders, and chat logs coming from n8n.

---

## Core Features (UI)

### Landing Page (`/`)
- **Hero section** describing a *“Rule‑Based Chatbot for Bookstore Management”*.
- **Call‑to‑action buttons** to open the Chat (`/chat`) and Admin Dashboard (`/admin`).
- **Horizontal auto‑scrolling “Featured books” strip**:
  - Shows up to 10 books from the backend catalog.
  - Displays **stock badge**, **title**, **author**, and **price**.
  - Uses **real book cover images** for known titles (e.g. *Atomic Habits*, *Ikigai*, *Harry Potter and the Philosopher’s Stone*, *The Alchemist*).
- **Feature cards** explaining how the chatbot helps with:
  - Rule‑based chat flows,
  - Guided book search,
  - Inventory view,
  - Upsell & recommendations,
  - Order & customer support,
  - n8n automation.
- **FAQ section** explaining delivery, refunds, tracking, genres, and payment options.
- **CTA footer** to start chatting with the bot.

### Chat Interface (`/chat`)
- Clean, centered chat window with **user** and **bot** message bubbles.
- **Session‑based** conversation (a session ID is generated and reused for that tab).
- **Quick‑action buttons** below the input, such as:
  - “📚 Show Fantasy Books”
  - “🚚 Track Order”
  - “💳 Payment Methods”
  - “📦 Delivery Charges”
- Clicking a quick action **auto‑fills** the input (you can still edit before sending).
- Messages are sent to n8n and **bot responses** (from `bot_response`) are appended to the chat.

### Admin Dashboard (`/admin`)
- Tabbed layout with three main tables backed by n8n:
  - **Books**
    - Columns: `Book ID`, `Title`, `Author`, `Genre`, `Price`, `Stock`.
    - Reads from `/books` API and expects snake_case fields (e.g. `book_id`, `stock`).
  - **Orders**
    - Columns: `Order ID`, `Customer Name`, `Email`, `Book ID`, `Quantity`, `Status`, `Order Date`, `Delivery Date`.
    - Status is color‑coded (badge) based on the value from backend.
  - **Chat Logs**
    - Columns: `Session ID`, `Timestamp`, `User Message`, `Bot Response`, `Intent`.
    - Intent badge colors for `book_search`, `payment`, `track`, and a default.
- **In‑memory caching** for `/books`, `/orders`, and `/logs` so switching tabs doesn’t spam the backend.

---

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icon library

---

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- n8n backend running with a webhook base at:
  - `http://localhost:5678/webhook/bookstore-chat`

---

## Installation

1. Navigate to the project directory:
```bash
cd bookstore-chatbot-frontend
```

2. Install dependencies:
```bash
npm install
```

---

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

npm run preview
```

---

## Project Structure

```
bookstore-chatbot-frontend/
├── src/
│   ├── components/
│   │   ├── ChatWindow.jsx          # Message list container
│   │   ├── MessageBubble.jsx       # Individual message component
│   │   ├── ChatInput.jsx           # Message input + quick-action buttons
│   │   └── Admin/
│   │       ├── BooksTable.jsx      # Books data table
│   │       ├── OrdersTable.jsx     # Orders data table
│   │       └── LogsTable.jsx       # Chat logs table
│   ├── pages/
│   │   ├── LandingPage.jsx         # Marketing / landing page with book strip
│   │   ├── ChatPage.jsx            # Main chat interface
│   │   └── AdminPage.jsx           # Admin dashboard (tabs for Books/Orders/Logs)
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

---

## API Integration (n8n)

All frontend API calls are defined in `src/services/api.js` and share the same base:

```javascript
const API_BASE_URL = 'http://localhost:5678/webhook/bookstore-chat';
```

The frontend uses **relative paths** from this base:

### 1. Chat: `POST /`

- **Full URL**: `http://localhost:5678/webhook/bookstore-chat`
- **Used by**: `sendMessage` in `api.js`, called from `ChatPage.jsx`.
- **Request body (example)**:

```json
{
  "message": "What payment methods do you support?",
  "sessionId": "uuid-1234-..."
}
```

- **Expected n8n response shape** (current workflow):

```json
{
  "timestamp": "2026-02-11T22:10:21.160+05:00",
  "user_message": "What payment methods do you support?",
  "bot_response": "We accept UPI, cards, and net banking.",
  "intent": "PAYMENT"
}
```

- **Frontend usage**:
  - `bot_response` is used as the chat bubble text.
  - `intent`, `timestamp`, and `user_message` can be logged by n8n for analytics.

### 2. Books: `GET /books`

- **Full URL**: `http://localhost:5678/webhook/bookstore-chat/books`
- **Used by**: `fetchBooks()` in `api.js`:
  - Admin `BooksTable.jsx`
  - Landing page horizontal strip (`LandingPage.jsx`)
- **Expected n8n response shapes supported**:
  - `[{ "success": true, "books": [ ... ] }]` (array with a wrapper object)
  - or `{ "books": [ ... ] }`
- **Normalized shape returned to UI**: `Array<book>` where each book has:

```json
{
  "book_id": "string or number",
  "title": "string",
  "author": "string",
  "genre": "string",
  "price": number,
  "stock": number
}
```

### 3. Orders: `GET /orders`

- **Full URL**: `http://localhost:5678/webhook/bookstore-chat/orders`
- **Used by**: `fetchOrders()` → `OrdersTable.jsx`
- **Expected n8n response shapes supported**:
  - `[{ "success": true, "orders": [ ... ] }]`
  - or `{ "orders": [ ... ] }`
- **Normalized shape returned to UI**: `Array<order>` with fields:

```json
{
  "order_id": "string or number",
  "customer_name": "string",
  "email": "string",
  "book_id": "string or number",
  "quantity": number,
  "status": "PENDING" | "SHIPPED" | "DELIVERED" | "...",
  "order_date": "ISO string or display string",
  "delivery_date": "ISO string or display string"
}
```

### 4. Logs: `GET /logs`

- **Full URL**: `http://localhost:5678/webhook/bookstore-chat/logs`
- **Used by**: `fetchLogs()` → `LogsTable.jsx`
- **Frontend supports multiple n8n response shapes**:
  - `[{ "success": true, "logs": [ ... ] }]`
  - `{ "logs": [ ... ] }`
  - `{ "success": true, "chats": [ ... ] }`
  - Raw n8n style: `[{ "json": { ... } }, ...]`
- **Normalized shape returned to UI**: `Array<log>` with fields:

```json
{
  "session_id": "string",
  "timestamp": "ISO string or display string",
  "user_message": "string",
  "bot_response": "string",
  "intent": "BOOK_SEARCH" | "PAYMENT" | "TRACK" | "..." 
}
```

There is **simple in‑memory caching** in `api.js` so multiple visits to the admin tabs do not re‑fetch data unless the app is reloaded.

---

## How to Use the App

### 1. Start the Frontend

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### 2. Configure n8n Workflows

In n8n, create workflows matching these webhook URLs:

- `POST` `http://localhost:5678/webhook/bookstore-chat`
  - Webhook → rules / function nodes → **Respond to Webhook** with `bot_response`, `intent`, etc.
- `GET` `http://localhost:5678/webhook/bookstore-chat/books`
  - Webhook → nodes that return `books` array → **Respond to Webhook**.
- `GET` `http://localhost:5678/webhook/bookstore-chat/orders`
  - Webhook → nodes that return `orders` array → **Respond to Webhook**.
- `GET` `http://localhost:5678/webhook/bookstore-chat/logs`
  - Webhook → nodes that return `logs`/`chats` array → **Respond to Webhook**.

**Important for n8n**: for each of these paths, make sure only **one active “Respond to Webhook”** node is reachable; otherwise n8n will throw “Unused Respond to Webhook node found in the workflow” errors.

### 3. Try the Chatbot

1. Go to the landing page at `/` and click **“Try the Chatbot”**.
2. Use the quick buttons (e.g. **Payment Methods**, **Track Order**) or type a custom query.
3. Watch n8n process the message and return a `bot_response` that appears in the chat.

### 4. Explore the Admin Dashboard

1. Go to `/admin`.
2. Open the **Books** tab to see your catalog as a table and in the landing page strip.
3. Open the **Orders** tab to see all orders and their statuses.
4. Open the **Chat Logs** tab to see historical chats with intents.

---

## Behavior & UX Details

- **Session management**: a session ID is generated once per browser tab and reused so n8n can group messages.
- **Loading & error states**:
  - Buttons disable while requests are in flight.
  - Console logs in `api.js` help debug malformed responses.
- **Responsive design**: all major screens are mobile‑friendly and use Tailwind for layout.

---

## Customization

### Changing API Base URL

Edit `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5678/webhook/bookstore-chat';
```

Change this to point to your deployed n8n instance.

### Styling

Modify `tailwind.config.js` for theme customization:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // your colors
      }
    }
  }
}
```

---

## Troubleshooting

### CORS Issues
Ensure your n8n backend allows requests from `http://localhost:5173` (or your deployed frontend origin).

### API Connection Failed
1. Verify n8n is running at `http://localhost:5678`.
2. Confirm that the webhook paths (`/`, `/books`, `/orders`, `/logs`) exist and are active.
3. Check the browser console and n8n logs for details.

### Build Errors
1. Delete `node_modules` and `package-lock.json` / `yarn.lock`.
2. Run `npm install` again.
3. Clear Vite cache: `npm run dev -- --force`.

---

## License

MIT
