import { randomBytes, scryptSync } from "node:crypto";
import { PrismaClient } from "@prisma/client";

const username = (process.env.ADMIN_USERNAME ?? "virtualnexgen2025@gmail.com")
  .trim()
  .toLowerCase();
const password = process.env.ADMIN_PASSWORD ?? "123456";
const legacyUsername = "admin";

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

    // Drop the previous default account so only the intended login remains.
    if (username !== legacyUsername) {
      await transaction.adminUser.deleteMany({ where: { username: legacyUsername } });
    }
  });
  console.log(`Admin credentials saved for ${username}.`);
} finally {
  await prisma.$disconnect();
}
