const dotenv = require("dotenv");
dotenv.config();

const MYSQL_ROOT_PASSWORD = process.env.MYSQL_ROOT_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_CONTAINER_PORT = process.env.MYSQL_CONTAINER_PORT;
const MYSQL_HOST = "mysql";
const MYSQL_USERNAME = "root";

module.exports = {
  development: {
    username: MYSQL_USERNAME,
    password: MYSQL_ROOT_PASSWORD,
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    port: MYSQL_CONTAINER_PORT ?? 3306,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: MYSQL_USERNAME,
    password: MYSQL_ROOT_PASSWORD,
    database: MYSQL_DATABASE,
    host: MYSQL_HOST,
    port: MYSQL_CONTAINER_PORT ?? 3306,
    dialect: "mysql",
  },
};
