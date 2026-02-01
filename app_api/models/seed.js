const fs = require('fs');
const mongoose = require('mongoose');
require('./db');
require('./travlr');

const Trip = mongoose.model('trips');

const dbName = process.env.DB_NAME || 'travlr';
const dbHost = process.env.DB_HOST || '127.0.0.1';

const uri = `mongodb://${dbHost}:27017/${dbName}`;

async function seedDB() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 30000
      });
    }

    const raw = fs.readFileSync('data/trips.json', 'utf8');
    const trips = JSON.parse(raw).map(t => ({
      name: String(t.name || '').trim(),
      length: String(t.length || '').trim(),
      description: String(t.description || '').trim(),
      price: Number(String(t.price || '').replace(/[^0-9.]/g, ''))
    }));

    const bad = trips.find(
      t => !t.name || !t.length || !t.description || !Number.isFinite(t.price)
    );
    if (bad) {
      console.error('Bad trip record (missing/invalid fields):', bad);
      process.exit(1);
    }

    const del = await Trip.deleteMany({});
    console.log('Trips deleted:', del.deletedCount);

    const inserted = await Trip.insertMany(trips);
    console.log('Trips inserted:', inserted.length);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDB();
