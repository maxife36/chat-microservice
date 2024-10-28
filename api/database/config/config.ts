import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config();

const MYSQL_ROOT_PASSWORD = process.env.MYSQL_ROOT_PASSWORD ?? "secret";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE ?? "custome_db";
const MYSQL_CONTAINER_PORT = process.env.MYSQL_CONTAINER_PORT ?? "3306";
const MYSQL_HOST = "mysql";
const MYSQL_USERNAME = "root";

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_ROOT_PASSWORD, {
  username: MYSQL_USERNAME,
  password: MYSQL_ROOT_PASSWORD,
  database: MYSQL_DATABASE,
  host: MYSQL_HOST,
  port: Number(MYSQL_CONTAINER_PORT),
  dialect: "mysql",
});

export default sequelize