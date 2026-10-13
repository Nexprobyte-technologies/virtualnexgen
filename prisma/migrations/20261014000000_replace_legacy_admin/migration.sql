INSERT INTO "AdminUser" ("id", "username", "password", "role", "createdAt", "updatedAt")
VALUES (
  'admin_default',
  'admin',
  'scrypt:4f3c2b1a09876543210fedcba9876543:faed8b79745bc3e71262b3c4484c2680201ec776c428aa31799bed73ee3d00b2884818376d0b083067cf2d9e91194928b9485da37b977aa3c35fc87efb228608',
  'admin',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT ("username") DO UPDATE SET
  "password" = EXCLUDED."password",
  "updatedAt" = CURRENT_TIMESTAMP;
