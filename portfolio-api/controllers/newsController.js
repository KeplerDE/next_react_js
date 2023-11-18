const axios = require('axios');
const config = require('../config');

const NEWS_API_ENDPOINT = 'https://newsapi.org/v2/top-headlines';
const NEWS_API_KEY = config.NEWS_API_KEY;

exports.getNews = async (req, res) => {
    try {
        const country = req.query.country || 'us';
        console.log(`getNews: country=${country}`); 

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

exports.getTopHeadlines = async (req, res) => {
    try {
        const { country, category, sources, q, pageSize, page } = req.query;
        console.log(`getTopHeadlines: country=${country}, category=${category}, sources=${sources}, q=${q}, pageSize=${pageSize}, page=${page}`); // Логирование параметров

        const params = {
            ...(country && { country }),
            ...(category && { category }),
            ...(sources && { sources }),
            ...(q && { q }),
            ...(pageSize && { pageSize }),
            ...(page && { page }),
            apiKey: NEWS_API_KEY
        };

        const response = await axios.get(NEWS_API_ENDPOINT, { params });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching top headlines:', error);
        res.status(500).send('Server error');
    }
};
