const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

// GET all trips
router.get("/trips", tripsController.tripsList);

// GET one trip by MongoDB _id
router.get("/trips/:tripId", tripsController.tripsReadOne);

// POST create a trip
router.post("/trips", tripsController.tripsAddTrip);

// PUT update a trip by _id
router.put("/trips/:tripId", tripsController.tripsUpdateTrip);

// DELETE a trip by _id
router.delete("/trips/:tripId", tripsController.tripsDeleteTrip);

module.exports = router;
