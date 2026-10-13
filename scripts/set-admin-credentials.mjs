import { randomBytes, scryptSync } from "node:crypto";
import { PrismaClient } from "@prisma/client";

const username = "virtualnexgen2025@gmail.com";
const password = process.env.ADMIN_PASSWORD;

if (!password) {
  throw new Error("Set ADMIN_PASSWORD in the environment before running this script.");
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
const prisma = new PrismaClient();

try {
  await prisma.$transaction(async (transaction) => {
    await transaction.adminUser.deleteMany({
      where: {
        OR: [{ username: "admin" }, { password: "admin@123" }],
      },
    });
    await transaction.adminUser.upsert({
      where: { username },
      create: { username, password: `scrypt:${salt}:${hash}` },
      update: { password: `scrypt:${salt}:${hash}` },
    });
  });
  console.log(`Admin credentials saved for ${username}.`);
} finally {
  await prisma.$disconnect();
}
