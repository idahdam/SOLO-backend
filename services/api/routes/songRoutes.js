const router = require("express").Router();
const controller = require("../controller/songController");

// Routes
router.get("/", controller.getAllSong);
router.get("/:id", controller.getSongById);
router.get("/:genre", controller.getSongByGenre);
router.post("/", controller.createSong);
router.delete("/:id", controller.deleteSongBydId);
router.put("/:id", controller.updateSongById);

module.exports = router;
