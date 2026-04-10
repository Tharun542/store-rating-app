require("dotenv").config();
const app = require("./src/app"); // import app.js
const sequelize = require("./src/config/db");

const PORT = process.env.PORT || 8089;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync({ alter: true });
    console.log("Tables created or updated");

    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();