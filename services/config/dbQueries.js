const pool = require("./dbPool");

const query = (queryText, param) => {
  return new Promise((resolve, reject) => {
    pool
      .query(queryText, param)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = query;
