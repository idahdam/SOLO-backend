const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const port = 5000;
const databaseConfig = require("./services/config/dbPool");
const query = require("./services/config/dbQueries");

require("dotenv").config();

databaseConfig.connect((err) => {
  if (err) {
    console.error("Error", err.message);
    return;
  }
  console.log("Database connected. Have fun with it!");
});

// Export Routing
const songRoute = require("./services/api/routes/songRoutes");
const reviewRoute = require("./services/api/routes/reviewRoutes");
const artistRoute = require("./services/api/routes/artistRoutes");
const genreRoute = require("./services/api/routes/genreRoutes");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use("/api/v1/artist", artistRoute);
app.use("/api/v1/song", songRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/genre", genreRoute);
app.get("/", (req, res) => {
  res.send("Welcome.");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server listening at port ${port}`);
});
