const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  length: { type: String, required: true },
  start: { type: String, required: true },
  resort: { type: String, required: true },
  perPerson: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});

mongoose.model('trips', TripSchema);
