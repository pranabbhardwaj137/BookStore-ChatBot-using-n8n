# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd d:\projects\Library-Automation-\bookstore-chatbot-frontend
npm install
```

### Step 2: Start the Application
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: **http://localhost:5173**

---

## 📋 Prerequisites

Before running the application, ensure:

1. ✅ Node.js is installed (v16 or higher)
2. ✅ n8n backend is running at `http://localhost:5678`
3. ✅ Webhook endpoints are configured:
   - `/webhook/chat`
   - `/webhook/books`
   - `/webhook/orders`
   - `/webhook/logs`

---

## 🎯 What You'll See

### Chat Interface (`/`)
- Clean messaging UI similar to WhatsApp
- Send messages and get bot responses
- Typing indicators while waiting
- Auto-scroll to latest messages

### Admin Dashboard (`/admin`)
- **Books Tab**: View all books with pricing and stock
- **Orders Tab**: Track customer orders and delivery status
- **Chat Logs Tab**: Review conversation history

---

## 🔧 Troubleshooting

### Issue: Dependencies won't install
**Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Issue: API connection failed
**Solution**: Verify n8n is running at `http://localhost:5678` and check browser console for errors

### Issue: CORS errors
**Solution**: Ensure n8n backend allows requests from `http://localhost:5173`

---

## 📦 Project Location

```
d:\projects\Library-Automation-\bookstore-chatbot-frontend\
```

---

## 📚 Full Documentation

See [README.md](file:///d:/projects/Library-Automation-/bookstore-chatbot-frontend/README.md) for complete documentation.
