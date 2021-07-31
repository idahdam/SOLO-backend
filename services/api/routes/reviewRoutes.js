const router = require("express").Router();
const controller = require("../controller/reviewController");

// Routes
router.post("/:id", controller.addReviewBySongId);

module.exports = router;
