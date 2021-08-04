const dotenv = require("dotenv");
const { Pool } = require("pg");
dotenv.config();

// const databaseConfig = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "testing_aslab",
//   password: "admin",
//   port: "5432",
//   //   ssl: {
//   //     rejectUnauthorized: false,
//   //   },
// });

const databaseConfig = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: "5432",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = databaseConfig;
