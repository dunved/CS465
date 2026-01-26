const fs = require("fs");
const path = require("path");

exports.index = (req, res) => {
  res.render("index", { title: "Home", year: new Date().getFullYear() });
};

exports.travel = (req, res) => {
  let trips = [];

  try {
    const tripsPath = path.join(process.cwd(), "data", "trips.json");
    const raw = fs.readFileSync(tripsPath, "utf8");
    trips = JSON.parse(raw);
  } catch (err) {
    console.error("Could not load trips.json:", err.message);
  }

  res.render("travel", {
    title: "Travel",
    year: new Date().getFullYear(),
    trips: trips
  });
};

exports.rooms = (req, res) => {
  res.render("rooms", { title: "Rooms", year: new Date().getFullYear() });
};

exports.meals = (req, res) => {
  res.render("meals", { title: "Meals", year: new Date().getFullYear() });
};

exports.news = (req, res) => {
  res.render("news", { title: "News", year: new Date().getFullYear() });
};

exports.about = (req, res) => {
  res.render("about", { title: "About", year: new Date().getFullYear() });
};

exports.contact = (req, res) => {
  res.render("contact", { title: "Contact", year: new Date().getFullYear() });
};
