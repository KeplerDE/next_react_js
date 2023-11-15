const axios = require('axios');
const config = require('../config');

const NEWS_API_ENDPOINT = 'https://newsapi.org/v2/top-headlines';
const NEWS_API_KEY = config.NEWS_API_KEY;

const getNews = async (req, res) => {
    try {
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
};

const getTopHeadlines = async (req, res) => {
    try {
        const { country, category, sources, q, pageSize, page } = req.query;
        const response = await axios.get(NEWS_API_ENDPOINT, {
            headers: {
                'X-Api-Key': NEWS_API_KEY
            },
            params: {
                country,
                category,
                sources,
                q,
                pageSize,
                page
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching top headlines:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getNews,
    getTopHeadlines
};
