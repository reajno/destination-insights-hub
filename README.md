# Destination Insights Hub

A regional tourism dashboard designed to help local government areas (LGAs), destination marketing organisations (DMOs), and tourism operators gain actionable insights from visitation data.

Built as a full-stack web application using **React**, **Vite**, and **Express**, this project is part of the IFN701/IFQ716 Capstone Unit at QUT.

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
git clone https://github.com/your-username/destination-insights-hub.git
cd destination-insights-hub
````

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
node index.js
```

Visit `http://localhost:3000` to confirm the API is running.

---

## 📁 Project Structure

```
destination-insights-hub/
├── client/      # Frontend React app
│   └── src/     # Components and pages
├── server/      # Backend Express API
│   └── index.js # API entry point
├── docs/        # Planning docs (user stories, sprint plan)
└── README.md    # Project overview and setup
```

---

## 📌 Features

* ✅ Role-based user access (Admin, LGA, DMO)
* ✅ Dashboard with charts and maps
* ✅ Data filtering by date and category
* ✅ Export reports as PDFs
* ✅ Compare regions to national/state benchmarks
* ⏳ Region-specific branding (stretch goal)

---

## 📊 Tech Stack

| Layer      | Tech                            |
| ---------- | ------------------------------- |
| Frontend   | React, Vite, Recharts           |
| Backend    | Node.js, Express                |
| Database   | PostgreSQL or Supabase          |
| Auth       | Supabase (or custom role-based) |
| Deployment | Vercel / Heroku (optional)      |

---

## 🧑‍🤝‍🧑 Team

* **Nathan Rees** — Team Lead / Full Stack Dev
* **John Reano** — Backend & Supabase Auth (OOO 2–15 May)
* **Perfect Ncube** — TBC
* **Aaron Valasinavicius** — TBC

---

## 📝 Planning Docs

All project documentation is located in the `/docs` folder:

* `user_stories.md`
* `sprint_1_plan.md`
* `database_schema.md` (TBC)
* `api_endpoints.md` (TBC)

---

## ✅ Sprint 1 Goal

> Get the core features up and running so users can log in, view their dashboard, and export reports.

---

## 🔐 Environment Variables

If using environment variables in production or DB connections:

```env
PORT=3000
DATABASE_URL=your_db_url_here
```

(Use `.env` file in `/server` and load with `dotenv`)

---

## ✨ Deployment (Optional)

If deploying:

* Frontend: Vercel (auto-deploys from GitHub)
* Backend: Render or Railway
* Add live URLs to this section when available

---

## 📬 Contact

For questions, contact via Slack for Team 3 communications

