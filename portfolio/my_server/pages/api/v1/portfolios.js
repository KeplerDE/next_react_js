// Импортируем API для работы с портфолио
import PortfolioApi from '@/lib/api/portfolios';

export default async function createPortfolio(req, res) {

  try {

    // Получаем данные портфолио из body запроса 
    const data = req.body;
    
    // Вызываем метод createPortfolio из API, 
    // передавая ему данные портфолио
    await new PortfolioApi().createPortfolio(data);
    
    // Портфолио создано успешно    
    return res.json({message: 'Portfolio was created!'});

  } catch(e) {

    // Если есть ошибка - возвращаем статус ответа на основе ошибки 
    return res.status(e.status || 400).end(e.message);

  }

}