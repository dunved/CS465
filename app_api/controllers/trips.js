const mongoose = require("mongoose");
const Trip = mongoose.model("trips");

// GET all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET one trip by MongoDB _id
const tripsReadOne = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId).exec();
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.status(200).json(trip);
  } catch (err) {
    res.status(400).json(err);
  }
};

// POST create new trip (ALL required fields)
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    res.status(201).json(newTrip);
  } catch (err) {
    res.status(400).json(err);
  }
};

// PUT update trip by _id (allow partial updates)
const tripsUpdateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.tripId,
      req.body,
      { new: true, runValidators: true }
    ).exec();

    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(updatedTrip);
  } catch (err) {
    res.status(400).json(err);
  }
};

// DELETE trip by _id
const tripsDeleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.tripId).exec();
    if (!deletedTrip) return res.status(404).json({ message: "Trip not found" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  tripsList,
  tripsReadOne,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
