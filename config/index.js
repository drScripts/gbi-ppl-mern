require("dotenv").config();

module.exports = {
  dbName: process.env.DATABASE_NAME,
  dbHost: process.env.DATABASE_HOST,
  dbUser: process.env.DATABASE_USER,
  dbPass: process.env.DATABASE_PASSWORD,
  dbDialect: process.env.DATABASE_DIALECT,
  jwtSecret: process.env.APP_JWT_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleDriveRootFolderId: process.env.GDRIVE_ROOT_FOLDER_ID,
  googleRedirectUrl: process.env.GOOGLE_REDIRECT_URL,
};
