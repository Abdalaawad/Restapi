const mongoose = require(`mongoose`);

const db = () => {
  mongoose
    .connect(process.env.SECRET_MONGO)
    .then(() => {
      console.log("Database Is Connecting");
    })
    .catch(() => {
      console.log("Database Not Connecting");
    });
};

module.exports = db;
