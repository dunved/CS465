const axios = require('axios');

exports.index = (req, res) => {
  res.render('index', { title: 'Home', year: new Date().getFullYear() });
};

exports.travel = async (req, res) => {
  try {
    const apiUrl = 'http://127.0.0.1:3001/api/trips';
    const response = await axios.get(apiUrl, { timeout: 5000 });

    res.render('travel', {
      title: 'Travel',
      year: new Date().getFullYear(),
      trips: response.data || []
    });
  } catch (err) {
    console.error('Travel page API error:', err.message);

    res.render('travel', {
      title: 'Travel',
      year: new Date().getFullYear(),
      trips: []
    });
  }
};

exports.rooms = (req, res) => {
  res.render('rooms', { title: 'Rooms', year: new Date().getFullYear() });
};

exports.meals = (req, res) => {
  res.render('meals', { title: 'Meals', year: new Date().getFullYear() });
};

exports.news = (req, res) => {
  res.render('news', { title: 'News', year: new Date().getFullYear() });
};

exports.about = (req, res) => {
  res.render('about', { title: 'About', year: new Date().getFullYear() });
};

exports.contact = (req, res) => {
  res.render('contact', { title: 'Contact', year: new Date().getFullYear() });
};
