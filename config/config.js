const { dbHost, dbName, dbPass, dbUser, dbDialect } = require("./");

module.exports = {
  development: {
    username: dbUser,
    password: dbPass,
    database: dbName,
    host: dbHost,
    dialect: dbDialect,
  },
  test: {
    username: dbUser,
    password: dbPass,
    database: dbName,
    host: dbHost,
    dialect: dbDialect,
  },
  production: {
    username: dbUser,
    password: dbPass,
    database: dbName,
    host: dbHost,
    dialect: dbDialect,
  },
};
