const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const apiUrl = 'http://127.0.0.1:3001/api/trips';
    const response = await axios.get(apiUrl, { timeout: 5000 });

    res.render('travel', {
      title: 'Travel',
      trips: response.data || []
    });
  } catch (err) {
    console.error('Travel route API error:', err.message);
    res.render('travel', {
      title: 'Travel',
      trips: []
    });
  }
});

module.exports = router;
