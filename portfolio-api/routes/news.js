const express = require('express');
const router = express.Router();
const { getNews, getTopHeadlines } = require('../controllers/newsController');

// Middleware для логирования запросов
router.use((req, res, next) => {
    console.log(`Received ${req.method} request at ${req.originalUrl}`);
    next();
});
router.get('/news', getNews);


module.exports = router;
