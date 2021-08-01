const query = require("../../config/dbQueries");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAllSong = async (req, res) => {
  const SQL_QUERY = "SELECT * FROM song NATURAL JOIN artist";
  try {
    const { rows } = await query(SQL_QUERY);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = "There are no songs";
      return res
        .status(status.error)
        .send(errorMessage.error + " " + error.code);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage.data);
  } catch (error) {
    errorMessage.error = "An error occured";
    return res.status(status.error).send(errorMessage.error + " " + error.code);
  }
};

const getSongById = async (req, res) => {
  const id = parseInt(req.params.id);
  const SQL_QUERY =
    "SELECT review.review_reviewer, review.review_content, review.review_rating, song.song_title, artist.artist_name FROM review INNER JOIN song ON review.song_id = song.song_id INNER JOIN artist ON song.artist_id = artist.artist_id AND artist.artist_id = $1";
  try {
    const { rows } = await query(SQL_QUERY, [id]);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = "There are no song with id: " + id;
      return res
        .status(status.error)
        .send(errorMessage.error + " " + error.code);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "An error occured.";
    return res.status(status.error).send(errorMessage.error + " " + error.code);
  }
};

const createSong = async (req, res) => {};

const deleteSongBydId = async (req, res) => {};

const updateSongById = async (req, res) => {};

module.exports = {
  getAllSong,
  getSongById,
  createSong,
  deleteSongBydId,
  updateSongById,
};
