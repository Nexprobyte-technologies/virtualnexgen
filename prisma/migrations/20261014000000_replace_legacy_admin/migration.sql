DELETE FROM "AdminUser"
WHERE "username" = 'admin'
   OR "password" = 'admin@123';

INSERT INTO "AdminUser" ("id", "username", "password", "role", "createdAt", "updatedAt")
VALUES (
  'admin_virtualnexgen2025',
  'virtualnexgen2025@gmail.com',
  'scrypt:cd2182727bf0f9f62ae1b06cbe845f78:11e660ee5cb7a83e00bb0cf306b9a3392f4894478b5315b4c6d65272a3e97ee7b9cdda48531115158d758510cdb6d5c00a882ecb2fac27d01d3e422299af59f3',
  'admin',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT ("username") DO UPDATE SET
  "password" = EXCLUDED."password",
  "updatedAt" = CURRENT_TIMESTAMP;
