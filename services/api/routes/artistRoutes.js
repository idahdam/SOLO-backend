const router = require("express").Router();
const controller = require("../controller/artistController");

// Routes
router.get("/", controller.getAllArtists);
router.get("/withSongs", controller.getAllArtistsWithSongs);
router.post("/", controller.createArtist);
router.put("/:id", controller.updateArtistById);
router.delete("/:id", controller.deleteArtistById);

module.exports = router;
