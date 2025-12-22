# 📝 AI To-Do App (Next.js)

An **AI-powered To-Do application** built with **Next.js**, **MongoDB**, **Tailwind CSS**, and **Hugging Face API**.  
It supports task management, AI-generated descriptions & images, and timer/stopwatch features.

🌐 **Live Demo**  
https://to-do-1-qxs4.onrender.com/

---

## 🚀 Features

- Create, search, complete, and delete tasks
- AI task description generation (Hugging Face)
- AI image generation for tasks
- Timer & stopwatch support
- Multiple UI themes
- MongoDB database integration

---

## 🛠️ Tech Stack

- Next.js
- MongoDB + Mongoose
- Tailwind CSS
- Hugging Face API

---

## 📁 Project Structure

```bash
to-do/
├── app/
│   ├── api/            # Task & AI APIs
│   ├── components/     # UI components
│   ├── editpage/       # Edit task page
│   ├── layout.js
│   └── page.js
│
├── lib/                # DB connection
├── model/              # Task schema
├── public/             # Static files
│
├── .env.local
├── package.json
└── README.md
```

---

## 🔐 Environment Variables

Create `.env.local`:

```env
DB_URL=your_mongodb_connection_string
HG_TOKEN=your_huggingface_api_token
```

⚠️ Do NOT commit `.env.local` to GitHub.

---

## ⚙️ Setup & Run

```bash
git clone https://github.com/25sahilsingh/to-do.git
cd to-do
npm install
npm run dev
```

Open:  
`http://localhost:3000`

---

## 🧑‍💻 Author

**Sahil Singh**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
