import { randomBytes, scryptSync } from "node:crypto";
import { PrismaClient } from "@prisma/client";

const username = "admin";
const password = process.env.ADMIN_PASSWORD ?? "admin@123";

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
const prisma = new PrismaClient();

try {
  await prisma.$transaction(async (transaction) => {
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
