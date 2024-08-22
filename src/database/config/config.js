const dotenv = require("dotenv");
dotenv.config();
console.log("Database URL:", process.env.DATABASE_URL);

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
