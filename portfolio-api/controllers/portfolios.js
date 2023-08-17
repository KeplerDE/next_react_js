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

exports.getPortfolioById = async (req, res) => {

  try {

    // Ищем портфолио по ID из параметров запроса
    const portfolio = await Portfolio.findById(req.params.id);
    
    // Возвращаем найденный документ в JSON 
    return res.json(portfolio);

  } catch(error) {

    // Обрабатываем ошибку поиска
    // Возвращаем статус 422 и текст ошибки
    return res.status(422).send(error.message);

  }

}