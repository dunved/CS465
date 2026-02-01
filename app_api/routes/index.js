const express = require('express');
const router = express.Router();
const trips = require('../controllers/trips');

router.get('/trips', trips.tripsList);
router.get('/trips/:tripCode', trips.tripsFindByCode);

module.exports = router;
