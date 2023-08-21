// Импортируем API для портфолио 
import PortfolioApi from '@/lib/api/portfolios';

// Импортируем утилиты для Auth0
import auth0 from '@/utils/auth0';

export default async function createPortfolio(req, res) {

  try {

    // Получаем access token из сессии
    const { accessToken } = await auth0.getSession(req);
    
    // Логируем для отладки
    console.log(accessToken) 

    // Создаем портфолио, передавая данные
    await new PortfolioApi().createPortfolio(req.body);

    // Возвращаем ответ об успехе
    return res.json({message: 'Portfolio was created!'});

  } catch(e) {
    
    // Обрабатываем ошибку
    return res.status(e.status || 400).end(e.message);

  }

}