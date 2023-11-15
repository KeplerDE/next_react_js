const express = require('express');
const router = express.Router();;
const {
    getNews,
    getTopHeadlines,
 } = require('../controllers/newsController');
router.get('/', getNews);
router.get('/top-headlines', getTopHeadlines);

module.exports = router;
