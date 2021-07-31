const router = require("express").Router();
const controller = require("../controller/songController");

// Routes
router.get("/", controller.getAllSong);
router.get("/:id", controller.getSongById);

module.exports = router;
