const router = require("express").Router();
const controller = require("../controller/reviewController");

// Routes
router.get("/", controller.getAllReviews);
router.get("/:id", controller.getAllReviewsById);
router.post("/:id", controller.createReviewBySongId);
router.put("/:id", controller.updateReviewById);
router.delete("/:id", controller.deleteReviewById);

module.exports = router;
