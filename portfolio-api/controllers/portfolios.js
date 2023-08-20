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


exports.createPortfolio = async (req, res) => {

  // Извлекаем данные портфолио из запроса
  const portfolioData = req.body;

  // Получаем ID пользователя 
  const userId = 'google-oauth2|118097200051766570711';

  // Создаем экземпляр Портфолио 
  const portfolio = new Portfolio(portfolioData);

  // Устанавливаем userID
  portfolio.userId = userId;

  try {

    // Сохраняем портфолио в БД
    const newPortfolio = await portfolio.save();
    
    // Возвращаем сохраненное портфолио
    return res.json(newPortfolio);

  } catch(error) {

    // Обрабатываем ошибку 
    return res.status(422).send(error.message);

  }

}