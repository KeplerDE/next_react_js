const config = require('../config');
const express = require('express');
const axios = require('axios');
const router = express.Router();



const NEWS_API_ENDPOINT = 'https://newsapi.org/v2/top-headlines';
const NEWS_API_KEY = config.NEWS_API_KEY;

router.get('/', async (req, res) => {
    try {
        // Using country parameter from the query string or defaulting to 'us'
        const country = req.query.country || 'us';

        const response = await axios.get(NEWS_API_ENDPOINT, {
            params: {
                country: country,
                apiKey: NEWS_API_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).send('Error fetching news');
    }
});

module.exports = router;
