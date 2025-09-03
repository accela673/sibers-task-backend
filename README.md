# Sibers Task Backend

Backend for user administration built with **Node.js**, **Express**, **TypeScript**, **Prisma**, and **PostgreSQL**.

## Features

- Super admin login with JWT
- CRUD for users
- Toggle user status to admin
- Swagger API docs

## Installation

```bash
npm install
```
## Create .env file in root direction

PORT=5000

DB_HOST=localhost

DB_PORT=5432

DB_NAME=db_name

DB_USER=postgres

DB_PASS=postgres

JWT_SECRET=supersecret


<!-- You can change these two values to any-->
ADMIN_USERNAME=superadmin

ADMIN_PASSWORD=superpassword

## Running server

```bash
# for development (with auto restarting server)
npm run dev 

# build for production
npm run build 

# run build
npm run start 
```

## Swagger link (if PORT in .env file is another change it)

http://localhost:5000/api/docs




enjoy!