const express = require('express');
const router = express.Router();

const { checkJwt, checkRole } = require('../controllers/auth');
const {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio } = require('../controllers/portfolios');

router.get('', getPortfolios);
router.get('/:id', getPortfolioById);

// TODO: create middleware to check for admin rights!!!!
router.post('', checkJwt, checkRole('guest'), createPortfolio);
router.patch('/:id', checkJwt, checkRole('guest'), updatePortfolio);
router.delete('/:id', checkJwt, checkRole('guest'), deletePortfolio);

module.exports = router;