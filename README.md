<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# User & Post API — NestJS + Prisma + JWT

A RESTful backend API built with **NestJS**, **Prisma ORM**, and **MariaDB**, featuring JWT-based authentication, user management, and post CRUD operations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS 11 |
| Language | TypeScript 5 |
| ORM | Prisma 7 |
| Database | MariaDB |
| Auth | JWT + Passport |
| Password Hashing | bcrypt |
| Validation | class-validator + class-transformer |
| Config | @nestjs/config |

---

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Protected routes using JWT Guard
- Post creation, reading, updating, and deletion
- Input validation with DTOs
- Environment-based configuration
- Prisma ORM with MariaDB via driver adapter

---

## Prerequisites

- Node.js >= 18
- npm >= 9
- MariaDB instance running locally or remotely

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/darshitdave/user-post-nestjs-prisma.git
cd user-post-nestjs-prisma
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/DB_NAME?allowPublicKeyRetrieval=true&ssl=false"

# JWT
JWT_SECRET="your-strong-secret-key"
JWT_EXPIRES_IN=7d
```

> **Note:** `allowPublicKeyRetrieval=true` is required for MariaDB/MySQL 8+ authentication.

### 4. Run database migrations

```bash
npx prisma migrate dev --name init
```

### 5. Generate Prisma client

```bash
npx prisma generate
```

### 6. Start the development server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`.

---

## Available Scripts

```bash
# Development (watch mode)
npm run start:dev

# Production build
npm run build
npm run start:prod

```

---

## Running Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## API Endpoints

### Auth

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | No |
| `POST` | `/auth/login` | Login and receive JWT token | No |

### Users

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/users` | Get all users | Yes |
| `GET` | `/users/:id` | Get user by ID | Yes |
| `PATCH` | `/users/:id` | Update user | Yes |
| `DELETE` | `/users/:id` | Delete user | Yes |

### Posts

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/posts` | Create a new post | Yes |
| `GET` | `/posts` | Get all posts | Yes |
| `GET` | `/posts/:id` | Get post by ID | Yes |
| `PATCH` | `/posts/:id` | Update post | Yes |
| `DELETE` | `/posts/:id` | Delete post | Yes |

---

## Authentication

This API uses **Bearer Token** authentication. After logging in, include the token in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

### Example: Register

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "secret123"}'
```

### Example: Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "secret123"}'
```

### Example: Create Post (Protected)

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title": "My First Post", "content": "Hello World!"}'
```

---

## Environment Variables Reference

| Variable | Required | Description | Example |
|---|---|---|---|
| `DATABASE_URL` | Yes | MariaDB connection string | `mysql://root:pass@localhost:3306/mydb` |
| `JWT_SECRET` | Yes | Secret key for signing JWT tokens | `my-super-secret-key` |
| `JWT_EXPIRES_IN` | No | Token expiry duration (default: `7d`) | `7d`, `1h`, `30m` |

---

## Prisma Commands

```bash
# Run migrations
npx prisma migrate dev

# Open Prisma Studio (DB GUI)
npx prisma studio

# Reset database
npx prisma migrate reset

# Pull schema from existing DB
npx prisma db pull

# Push schema changes without migration
npx prisma db push
```

---

## License

This project is **UNLICENSED** and intended for private use.
