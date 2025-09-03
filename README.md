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

#Dont change it because frontend has to fetch from http://localhost:5000

PORT=5000

#Set your own values

DB_HOST=

DB_PORT=

DB_NAME=

DB_USER=

DB_PASS=

JWT_SECRET=

#Username and password for superadmin

ADMIN_USERNAME=

ADMIN_PASSWORD=

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




Enjoy!
