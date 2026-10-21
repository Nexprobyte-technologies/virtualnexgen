-- Set the admin panel credentials to virtualnexgen2025@gmail.com / 123456
-- and remove the previous default "admin" account.

DELETE FROM "AdminUser"
WHERE "username" = 'admin';

INSERT INTO "AdminUser" ("id", "username", "password", "role", "createdAt", "updatedAt")
VALUES (
  'admin_primary',
  'virtualnexgen2025@gmail.com',
  'scrypt:0dd7c7bcc46863b686b4a6d81cd1a4aa:3231bbb918e223da7496896680bd0b0e137a4fd1fd65fb9c7f454c4b41350c42d07388cb5ca195e4a424b19c6de02d704c4d048f80cee1095e3ccc9d46afe57f',
  'admin',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT ("username") DO UPDATE SET
  "password" = EXCLUDED."password",
  "updatedAt" = CURRENT_TIMESTAMP;
