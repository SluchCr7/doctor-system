# Medical Clinic Management System - Backend

Production-ready backend for a MERN stack medical clinic management system.

## Features

- **Authentication**: JWT with Refresh Tokens & HttpOnly Cookies.
- **RBAC**: Role-based access control (Doctor, Patient, Admin).
- **Security**: Helmet, CORS, Rate Limiting, NoSQL Injection & XSS Protection.
- **Appointments**: Full booking system with notifications.
- **Profiles**: Separate dashboards for Doctors and Patients.
- **Documentation**: Integrated Swagger UI.
- **Environment**: Containerized with Docker.

## Tech Stack

- Node.js & Express.js
- MongoDB & Mongoose
- JWT & Bcrypt
- Joi (Validation)
- NodeMailer (Email)
- Swagger (API Docs)
- Jest (Testing)

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- Docker (Optional)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Environment:
   Edit `.env` with your MongoDB URI and SMTP credentials.

3. Run Development Server:
   ```bash
   npm run dev
   ```

### API Documentation

Available at: `http://localhost:5000/api-docs`

### Testing

```bash
npm test
```

### Docker Support

```bash
docker-compose up --build
```

## Folder Structure

- `src/config`: Configuration files (DB, Swagger).
- `src/controllers`: Request handlers.
- `src/middleware`: Custom middlewares (Auth, Error, Validation).
- `src/models`: Mongoose schemas.
- `src/routes`: API route definitions.
- `src/utils`: Helper functions and utilities.
- `src/validations`: Joi validation schemas.
- `tests/`: Jest test files.
