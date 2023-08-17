// Подключаем модель Portfolio
const mongoose = require('mongoose');  
const Portfolio = mongoose.model('Portfolio');

// Экспортируем async функцию для получения всех документов
exports.getPortfolios = async (req, res) => {

  // Делаем запрос к БД через модель и получаем все документы
  const portfolios = await Portfolio.find({});
  
  // Возвращаем полученные документы в JSON формате
  return res.json(portfolios); 

}