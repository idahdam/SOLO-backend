const query = require("../../config/dbQueries");
const { errorMessage, successMessage, status } = require("../helpers/status");

const createReviewBySongId = async (req, res) => {
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

const getAllReviews = async (req, res) => {
  const SQL_QUERY =
    "select review.review_id, review.review_reviewer, review.review_content, review.review_rating, song.song_title, song.song_id, artist.artist_id, artist.artist_name" +
    " from review inner join song on review.song_id = song.song_id inner join artist on song.artist_id = artist.artist_id order by review.review_id desc";
  try {
    const { rows } = await query(SQL_QUERY);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = "There are no reviews yet";
      return res
        .status(status.error)
        .send(errorMessage.error + " " + error.code);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage.data);
  } catch (error) {
    errorMessage.error = "An error happened";
    return res.status(status.error).send(errorMessage.error + " " + error.code);
  }
};

const getAllReviewsById = async (req, res) => {
  const id = req.params.id;
  const SQL_QUERY =
    "select * from review where song_id = $1 order by review_id desc";
  try {
    const { rows } = await query(SQL_QUERY, [id]);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = "There are no reviews yet";
      return res
        .status(status.error)
        .send(errorMessage.error + " " + error.code);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage.data);
  } catch (error) {
    errorMessage.error = "An error happened";
    return res.status(status.error).send(errorMessage.error + " " + error.code);
  }
};

const updateReviewById = async (req, res) => {
  const id = req.params.id;
  const reviewer = req.body.reviewer;
  const content = req.body.content;
  const songId = req.body.songId;
  const rating = req.body.rating;
  const SQL_QUERY =
    "update review set review_reviewer = $1, review_content = $2, song_id = $3, review_rating = $4 where review_id = $5 returning *";

  try {
    const { rows } = await query(SQL_QUERY, [
      reviewer,
      content,
      songId,
      rating,
      id,
    ]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = `Error happened during update to the table.`;
      return res.status(status.error).send(errorMessage + " " + error.code);
    }
    return res.status(status.nocontent).send(successMessage);
  } catch (error) {
    errorMessage.error = "Unable to modify review.";
    return res.status(status.error).send(errorMessage.error + " " + error.code);
  }
};

const deleteReviewById = async (req, res) => {
  const id = req.params.id;
  const SQL_QUERY = "delete from review where review_id = $1 returning *";

  try {
    const { rows } = await query(SQL_QUERY, [id]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = `Error happened during delete to the table.`;
      return res.status(status.error).send(errorMessage + " " + error.code);
    }
    return res.status(status.nocontent).send(successMessage);
  } catch (error) {
    errorMessage.error = "Unable to delete review.";
    return res.status(status.error).send(errorMessage.error + " " + error.code);
  }
};

module.exports = {
  createReviewBySongId,
  getAllReviews,
  getAllReviewsById,
  updateReviewById,
  deleteReviewById,
};
