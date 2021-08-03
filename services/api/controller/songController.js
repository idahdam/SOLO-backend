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

const getReviewsSongById = async (req, res) => {
  const id = parseInt(req.params.id);
  const SQL_QUERY =
    "SELECT review.review_reviewer, review.review_content, review.review_rating, song.song_title, artist.artist_name FROM review INNER JOIN song ON review.song_id = song.song_id INNER JOIN artist ON song.artist_id = artist.artist_id AND song.song_id = $1";
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

const getSongById = async (req, res) => {
  const id = req.params.id;
  const SQL_QUERY =
    "select song.song_id, song.song_picture, song.song_title, artist.artist_id, artist.artist_name from song inner join artist on song.artist_id = artist.artist_id and song_id = $1";
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

const getSongByGenre = async (req, res) => {
  const genre = req.params.genre;
  const SQL_QUERY =
    "select * from song natural join artist natural join genre where song.genre_id = genre.genre_id and genre.genre_type = $1";
  try {
    const { rows } = await query(SQL_QUERY, [genre]);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = "There are no songs";
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

const createSong = async (req, res) => {
  const picture = req.body.picture;
  const title = req.body.title;
  const artistId = req.body.artistId;
  const genreId = req.body.genreId;
  const SQL_QUERY =
    "insert into song(song_picture, song_title, artist_id, genre_id) values ($1, $2, $3, $4)";

  try {
    const { rows } = await query(SQL_QUERY, [
      picture,
      title,
      artistId,
      genreId,
    ]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = `Error happened during adding to the table.`;
      return res.status(status.error).send(errorMessage + " " + error.code);
    }
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Unable to add song.";
    return res.status(status.error).send(errorMessage.error + " " + error.code);
  }
};

const deleteSongBydId = async (req, res) => {
  const id = req.params.id;
  const SQL_QUERY = "delete from song where song_id = $1 returning *";
  try {
    const { rows } = await query(SQL_QUERY, [id]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = `Error happened during delete to the table.`;
      return res.status(status.error).send(errorMessage + " " + error.code);
    }
    return res.status(status.nocontent).send(successMessage);
  } catch (error) {
    errorMessage.error = "Unable to delete song.";
    return res.status(status.error).send(errorMessage.error + " " + error.code);
  }
};

const updateSongById = async (req, res) => {
  const id = req.params.id;
  const picture = req.body.picture;
  const title = req.body.title;
  const artistId = req.body.artistId;
  const genreId = req.body.genreId;
  const SQL_QUERY =
    "update song set song_picture = $1, song_title = $2, artist_id = $3, genre_id = $4 where song_id = $5 returning *";
  try {
    const { rows } = await query(SQL_QUERY, [
      picture,
      title,
      artistId,
      genreId,
      id,
    ]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = `Error happened during update to the table.`;
      return res.status(status.error).send(errorMessage + " " + error.code);
    }
    return res.status(status.nocontent).send(successMessage);
  } catch (error) {
    errorMessage.error = "Unable to modify song.";
    return res.status(status.error).send(errorMessage.error + " " + error.code);
  }
};

module.exports = {
  getAllSong,
  getSongById,
  getReviewsSongById,
  getSongByGenre,
  createSong,
  deleteSongBydId,
  updateSongById,
};
