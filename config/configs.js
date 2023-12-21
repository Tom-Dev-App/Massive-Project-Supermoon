require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV ?? "development";
const NODE_PORT = process.env.NODE_PORT ?? 8000;
const DB_HOST = process.env.DB_HOST ?? "localhost";
const DB_PORT = process.env.DB_PORT ?? "3380";
const DB_USER = process.env.DB_USER ?? "root";
const DB_PASSWORD = process.env.DB_PASSWORD ?? "root";
const DB_NAME = process.env.DB_NAME ?? "kuningan_tour";
const SECRET = process.env.SECRET_TOKEN ?? "-9ijdqijd293&^2";

module.exports = {
  NODE_PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  NODE_ENV,
  SECRET,
};
