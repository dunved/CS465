const fs = require("fs");
const path = require("path");

const travel = (req, res) => {
  let trips = [];

  try {
    // Always load from the project root: /data/trips.json
    const tripsPath = path.join(process.cwd(), "data", "trips.json");
    const raw = fs.readFileSync(tripsPath, "utf8");
    trips = JSON.parse(raw);
  } catch (err) {
    console.error("Could not load data/trips.json:", err.message);
  }

  res.render("travel", {
    title: "Travlr Getaways",
    year: new Date().getFullYear(),
    trips: trips
  });
};

module.exports = {
  travel
};
