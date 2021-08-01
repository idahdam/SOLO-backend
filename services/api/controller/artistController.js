const query = require("../../config/dbQueries");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAllArtists = async (req, res) => {
  const SQL_QUERY = "select * from artist order by artist_id desc;";
  try {
    const { rows } = await query(SQL_QUERY);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = "There are no artist yet";
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

const getAllArtistsWithSongs = async (req, res) => {
  const SQL_QUERY =
    "select artist.artist_id, artist.artist_name, song.song_id, song.song_title, song.song_picture, genre.genre_type from artist inner join song on artist.artist_id = song.artist_id inner join genre on song.genre_id = genre.genre_id order by artist.artist_id desc;";
  try {
    const { rows } = await query(SQL_QUERY);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = "There are no artist yet";
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

const createArtist = async (req, res) => {
  const picture = req.body.picture;
  const name = req.body.name;
  const SQL_QUERY = `insert into artist(artist_picture, artist_name) values ($1, $2) returning *`;

  try {
    const { rows } = await query(SQL_QUERY, [picture, name]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = `Error happened during adding to the table.`;
      return res.status(status.error).send(errorMessage + " " + error.code);
    }
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Unable to add artist.";
    return res.status(status.error).send(errorMessage.error + " " + error.code);
  }
};

const deleteArtistById = async (req, res) => {
  const id = req.params.id;
  const SQL_QUERY = "delete from artist where artist_id = $1 returning *";

  try {
    const { rows } = await query(SQL_QUERY, [id]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = `Error happened during delete to the table.`;
      return res.status(status.error).send(errorMessage + " " + error.code);
    }
    return res.status(status.nocontent).send(successMessage);
  } catch (error) {
    errorMessage.error = "Unable to delete artist.";
    return res.status(status.error).send(errorMessage.error + " " + error.code);
  }
};

const updateArtistById = async (req, res) => {
  const id = req.params.id;
  const picture = req.body.picture;
  const name = req.body.name;
  const SQL_QUERY =
    "update artist set artist_name = $1, artist_picture = $2 where artist_id = $3 returning *";

  try {
    const { rows } = await query(SQL_QUERY, [name, picture, id]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = `Error happened during update to the table.`;
      return res.status(status.error).send(errorMessage + " " + error.code);
    }
    return res.status(status.nocontent).send(successMessage);
  } catch (error) {
    errorMessage.error = "Unable to modify artist.";
    return res.status(status.error).send(errorMessage.error + " " + error.code);
  }
};

module.exports = {
  getAllArtists,
  getAllArtistsWithSongs,
  createArtist,
  deleteArtistById,
  updateArtistById,
};
