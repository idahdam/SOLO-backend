const { databaseConfig } = require("./dbPool");

databaseConfig.on("connect", () => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("connected to the database");
});

//add queries here

module.exports = {
  startDatabase,
};
