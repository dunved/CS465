const express = require("express");
const path = require("path");
const hbs = require("hbs");
const cors = require("cors");

require('dotenv').config();
require("./app_api/models/db");

const app = express();

/* Dynamic Port */
const PORT = process.env.PORT || 3001;

/* CORS (Required for Angular frontend) */
app.use(cors());

// Wire in our authentication module
var passport = require('passport');
require('./app_api/config/passport');

/* Views */
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");

hbs.registerPartials(
  path.join(__dirname, "app_server", "views", "partials")
);

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

/* Routes */
const siteRoutes = require("./app_server/routes");
app.use("/", siteRoutes);

const apiRoutes = require("./app_api/routes");
app.use("/api", apiRoutes);

/* Health Check */
app.get("/health", (req, res) => {
  res.json({ status: "ok", port: PORT });
});

// Catch unauthorized error and create 401
app.use((err, req, res, next) => {
  if(err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});

/* Start Server */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Travlr running at http://localhost:${PORT}`);
});
