const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load Trip model
require('./travlr');

// Connect to MongoDB running inside WSL
mongoose.connect('mongodb://127.0.0.1:27017/travlr');

// Connection status logs
mongoose.connection.on('connected', () => {
  console.log('✓ MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('✗ MongoDB connection error:', err.message);
});

// Get Trip model
const Trip = mongoose.model('trips');

// Load trips JSON
const tripsFile = path.join(__dirname, '../../data/trips.json');
const tripsData = JSON.parse(fs.readFileSync(tripsFile, 'utf-8'));

// Seed database
const seedDB = async () => {
  try {
    await Trip.deleteMany({});
    await Trip.insertMany(tripsData);
    console.log('✓ Trips database seeded successfully');
  } catch (err) {
    console.error('✗ Seeding error:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
