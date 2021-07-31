const query = require("../../config/dbQueries");
const { errorMessage, successMessage, status } = require("../helpers/status");

const addReviewBySongId = async (req, res) => {
  const id = req.params.id;
  const reviewer = req.body.reviewer;
  const content = req.body.content;
  const rating = parseFloat(req.body.rating);
  const SQL_QUERY =
    "INSERT INTO review(review_reviewer, review_content, song_id, review_rating) VALUES ($1, $2, $3, $4) returning *";
  try {
    const { rows } = await query(SQL_QUERY, [reviewer, content, id, rating]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = `Cannot add review`;
      return res.status(status.error).send(errorMessage + " " + error.code);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Unable to add review.";
    return res.status(status.error).send(errorMessage.error + " " + error.code);
  }
};
module.exports = { addReviewBySongId };
