require("dotenv").config();

module.exports = {
  dbName: process.env.DATABASE_NAME,
  dbHost: process.env.DATABASE_HOST,
  dbUser: process.env.DATABASE_USER,
  dbPass: process.env.DATABASE_PASSWORD,
  dbDialect: process.env.DATABASE_DIALECT,
  jwtSecret: process.env.APP_JWT_SECRET,
};
