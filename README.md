# 💰 Moji troškovi – Expense Tracker

A full-stack web application for tracking personal expenses. Each user has their own account and can access their expenses from any device.

🔗 **Live demo:** https://moji-troskovi.vercel.app

> The backend runs on a free hosting plan, so the first request after a period of inactivity can take up to a minute.

## ✨ Features

- Registration and login with email and password
- Sign in with Google *(currently in testing mode, limited to approved test users)*
- Each user sees only their own expenses, on any device
- Add, edit and delete expenses (name, amount, category, date)
- Expenses grouped by month, with monthly and overall totals
- Validation on both frontend and backend
- Responsive design (works on phone and desktop)

## 🛠️ Tech Stack

**Frontend**
- Angular 20 (standalone components, route guards, HTTP interceptor)
- TypeScript, HTML, CSS

**Backend**
- Java 17, Spring Boot 3
- Spring Security with JWT authentication
- Google Identity Services (Google sign-in)
- Spring Data JPA / Hibernate
- BCrypt password hashing

**Database & Deployment**
- PostgreSQL (Neon)
- Frontend on Vercel, backend on Render (Docker)

## 🏗️ Architecture

```
Angular (Vercel)  →  Spring Boot REST API (Render)  →  PostgreSQL (Neon)
```

| Endpoint | Description |
|---|---|
| `POST /api/auth/registracija` | Register a new user |
| `POST /api/auth/prijava` | Log in with email and password |
| `POST /api/auth/google` | Log in with Google |
| `GET /api/troskovi` | Get the logged-in user's expenses |
| `POST /api/troskovi` | Add an expense |
| `PUT /api/troskovi/{id}` | Edit an expense |
| `DELETE /api/troskovi/{id}` | Delete an expense |

## 🚀 Running Locally

You need Java 17+, Maven, Node.js and Angular CLI.

**Backend** (runs on `http://localhost:8080`, uses an in-memory H2 database by default):

```bash
cd backend
mvn spring-boot:run
```

**Frontend** (runs on `http://localhost:4200`):

```bash
cd frontend
npm install
ng serve
```

### Environment variables (production)

| Variable | Description |
|---|---|
| `DB_URL` | PostgreSQL JDBC URL |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `ALLOWED_ORIGINS` | Frontend URLs allowed by CORS |

## 📌 Planned

- [ ] Expense search and filters
- [ ] Monthly spending charts by category

- [ ] Expense search and filters
- [ ] Monthly spending charts by category
