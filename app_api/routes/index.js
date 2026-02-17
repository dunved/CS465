const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader == null) {
    console.log('Auth Header Required but NOT PRESENT!');
    return res.sendStatus(401);
  }
  let headers = authHeader.split(' ');
  if (headers.length < 1) {
    console.log('Not enough tokens in Auth Header: ' + headers.length);
    return res.sendStatus(501);
  }
  const token = authHeader.split(' ')[1];
  if (token == null) {
    console.log('Null Bearer Token');
    return res.sendStatus(401);
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      return res.sendStatus(401).json('Token Validation Error!');
    }
    req.auth = verified; // Set the auth param to the decoded object
  });
  next(); // We need to continue or this will hang forever
}

// GET all trips
router.get("/trips", tripsController.tripsList);

// GET one trip by MongoDB _id
router.get("/trips/:tripId", tripsController.tripsReadOne);

// POST create a trip - requires authentication
router.post("/trips", authenticateJWT, tripsController.tripsAddTrip);

// PUT update a trip by _id - requires authentication
router.put("/trips/:tripId", authenticateJWT, tripsController.tripsUpdateTrip);

// DELETE a trip by _id
router.delete("/trips/:tripId", tripsController.tripsDeleteTrip);

// define route for register endpoint
router
  .route('/register')
  .post(authController.register);

// define route for login endpoint
router
  .route('/login')
  .post(authController.login);

module.exports = router;
