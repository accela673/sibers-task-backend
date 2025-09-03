import app from "./app";
import { prisma } from "./config/prisma";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Проверка подключения к базе
    await prisma.$connect();
    console.log("Database connected");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
}

startServer();
