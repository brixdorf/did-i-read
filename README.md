<div align="center">
  <img src="frontend/public/website_icon.png" width="80" alt="Website Icon?" />
  <h1>Did I Read Today?</h1>
</div>

A personal habit tracker to log daily newspaper and book reading.
Built with React, Node.js, Express, and SQLite. Deployed at [didiread.romitraj.dev](https://didiread.romitraj.dev).

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS  
**Backend:** Node.js, Express  
**Database:** SQLite  
**Auth:** JWT with HTTP-only cookies, bcrypt  
**Deployment:** Nginx, PM2

## Features

- Two calendars for tracking newspaper and book reading
- Click a day to mark it as read — click again to unmark
- Monthly navigation
- Goal and Achieved stats per month
- Light and dark mode following system preference
- Fully responsive — works on mobile and desktop
- Secure login — only the owner can make changes
- Data persists in SQLite database

## Project Structure

```
did-i-read/
  frontend/
  ├── public/
  ├── src/
  │ ├── assets/
  │ │ ├── fonts/
  │ │ └── icons/
  │ │
  │ ├── components/
  │ │ └── Calendar.jsx
  │ │
  │ ├── pages/
  │ │ ├── HomePage.jsx
  │ │ └── Login.jsx
  │ │
  │ ├── utils/
  │ │ └── api.js
  │ │
  │ ├── App.jsx
  │ ├── index.css
  │ └── main.jsx
  │
  ├── .env.development
  ├── .env.production
  │
  ├── .gitignore
  └── index.html

  backend/
  ├── .env
  ├── .gitignore
  ├── database.db
  ├── database.js
  └── index.js
```

## Local Development

### Prerequisites

- Node.js 24+
- npm

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example` as reference:

```bash
cp .env.example .env
```

Generate a bcrypt hash for your password:

```bash
node -e "const bcrypt = require('bcrypt'); console.log(bcrypt.hashSync('yourpassword', 10))"
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.development` file:

```bash
cp .env.development.example .env.development
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:3000`.

## Deployment

### Requirements

- Ubuntu 24.04 server
- Node.js 24+
- Nginx
- PM2
- Certbot

### Steps

1. Clone the repo on your server
2. Set up backend `.env` with production values
3. Build the frontend: `npm run build`
4. Configure Nginx to serve `frontend/dist` and proxy `/api` to Node
5. Start backend with PM2: `pm2 start index.js --name "didiread-backend"`
6. Get SSL certificate: `sudo certbot --nginx -d yourdomain.com`

## Environment Variables

### Backend `.env`

| Variable      | Description                               |
| ------------- | ----------------------------------------- |
| `JWT_SECRET`  | Long random string for signing JWT tokens |
| `USERNAME`    | Login username                            |
| `PASSWORD`    | bcrypt hashed password                    |
| `PORT`        | Server port (default 3000)                |
| `CORS_ORIGIN` | Frontend URL for CORS                     |

### Frontend `.env.development`

| Variable       | Description                              |
| -------------- | ---------------------------------------- |
| `VITE_API_URL` | Backend URL (e.g. http://localhost:3000) |

In production `VITE_API_URL` is left empty since frontend and backend are on the same domain.
