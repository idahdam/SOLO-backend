const query = require("../../config/dbQueries");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAllGenres = async (req, res) => {
  const SQL_QUERY = "select * from genre";
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

module.exports = {
  getAllGenres,
};
