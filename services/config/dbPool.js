const dotenv = require("dotenv");
const { Pool } = require("pg");
dotenv.config();

const databaseConfig = new Pool({
  user: "postgres",
  host: "localhost",
  database: "testing_aslab",
  password: "admin",
  port: "5432",
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
});

module.exports = databaseConfig;
