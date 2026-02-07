const axios = require('axios');

const apiOptions = {
  server: 'http://127.0.0.1:3001'
};

/* Home page */
const index = (req, res) => {
  res.render('index', {
    title: 'Home',
    year: new Date().getFullYear()
  });
};

/* Travel page – data from REST API */
const travel = async (req, res) => {
  try {
    const response = await axios.get(
      `${apiOptions.server}/api/trips`,
      { timeout: 5000 }
    );

    res.render('travel', {
      title: 'Travel',
      year: new Date().getFullYear(),
      trips: response.data
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

/* Static pages */
const rooms = (req, res) => {
  res.render('rooms', {
    title: 'Rooms',
    year: new Date().getFullYear()
  });
};

const meals = (req, res) => {
  res.render('meals', {
    title: 'Meals',
    year: new Date().getFullYear()
  });
};

const news = (req, res) => {
  res.render('news', {
    title: 'News',
    year: new Date().getFullYear()
  });
};

const about = (req, res) => {
  res.render('about', {
    title: 'About',
    year: new Date().getFullYear()
  });
};

const contact = (req, res) => {
  res.render('contact', {
    title: 'Contact',
    year: new Date().getFullYear()
  });
};

/* EXPORTS — MUST BE LAST */
module.exports = {
  index,
  travel,
  rooms,
  meals,
  news,
  about,
  contact
};
