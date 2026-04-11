require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://store-rating-app-c4ek-git-main-godasu-tharuns-projects.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/store", require("./routes/stores.routes"));
app.use("/api/rating", require("./routes/rating.routes"));
app.use("/api/owner", require("./routes/owner.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

module.exports = app;