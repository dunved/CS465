const express = require('express');
const router = express.Router();

const ctrlPages = require('../controllers/pages');

console.log("Loaded ctrlPages keys:", Object.keys(ctrlPages));

router.get('/', ctrlPages.index);
router.get('/travel', ctrlPages.travel);
router.get('/rooms', ctrlPages.rooms);
router.get('/meals', ctrlPages.meals);
router.get('/news', ctrlPages.news);
router.get('/about', ctrlPages.about);
router.get('/contact', ctrlPages.contact);

module.exports = router;
