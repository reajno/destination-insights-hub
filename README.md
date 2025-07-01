# Destination Insights Hub

A regional tourism dashboard designed to help local government areas (LGAs), destination marketing organisations (DMOs), and tourism operators gain actionable insights from visitation data.

Built as a full-stack web application using **React**, **Vite**, and **Express**, this project is part of the IFQ717 Capstone Unit at QUT.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Git

---

### 🔧 Project Setup

#### Clone the Repository

```bash
git clone https://github.com/reajno/destination-insights-hub.git
cd destination-insights-hub
```

---

### 🖥️ Frontend Setup (React + Vite)

```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` to view the frontend in your browser.

---

### ⚙️ Backend Setup (Express)

```bash
cd server
npm install
npm run dev
```

Visit `http://localhost:3000/` to confirm the API is running.

---

## 📁 Project Structure

```
destination-insights-hub/
├── client/      # Frontend React app
│   └── src/     # Components and pages
├── server/      # Backend Express API
│   └── index.js # API entry point
└── README.md    # Project overview and setup
```

---

## 📌 Features

- ✅ Role-based user access (Admin, Analyst, Operator)
- ✅ Dashboard with charts
- ✅ Data filtering by date
- ✅ Export dashboard as PDFs
- ✅ Compare various regions available from database
- ✅ Upload CSV data to database

---

## 📊 Tech Stack

| Layer    | Tech                             |
| -------- | -------------------------------- |
| Frontend | React, Vite, Chakra UI, Recharts |
| Backend  | Node.js, Express                 |
| Database | PostgreSQL                       |
| Auth     | Supabase Auth                    |

---

## 🧑‍🤝‍🧑 Dev Team

- **John Reano** — Backend & Supabase Auth (OOO 2–15 May)

---
