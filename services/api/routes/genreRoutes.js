const router = require("express").Router();
const controller = require("../controller/genreController");

// Routes
router.get("/", controller.getAllGenres);

module.exports = router;
