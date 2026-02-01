const express = require("express");
const path = require("path");
const hbs = require("hbs");

require("./app_api/models/db");

const app = express();

/* WSL-safe dynamic port */
const PORT = process.env.PORT || 3001;

/* Views */
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");

hbs.registerPartials(path.join(__dirname, "app_server", "views", "partials"));

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

/* Routes */
const siteRoutes = require("./app_server/routes");
app.use("/", siteRoutes);

const apiRoutes = require("./app_api/routes");
app.use("/api", apiRoutes);

/* Health check */
app.get("/health", (req, res) => {
  res.json({ status: "ok", port: PORT });
});

/* Start server */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Travlr running at http://localhost:${PORT}`);
});

