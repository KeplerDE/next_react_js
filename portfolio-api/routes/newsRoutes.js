const express = require('express');
const router = express.Router();
const { getTopHeadlines } = require('../controllers/newsController');

// Middleware для логирования запросов
router.use((req, res, next) => {
    console.log(`Received ${req.method} request at ${req.originalUrl}`);
    next();
});

// Определяем маршруты
router.get('/', getTopHeadlines);


module.exports = router;
