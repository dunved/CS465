const express = require('express');
const router = express.Router();
const trips = require('../controllers/trips');

// Get all trips
router.get('/trips', trips.tripsList);

// Get single trip by MongoDB _id
router.get('/trips/:tripId', trips.tripsReadOne);

module.exports = router;
