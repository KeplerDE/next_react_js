// Импорт API для портфолио
import PortfolioApi from '@/lib/api/portfolios';

// Импорт утилит Auth0  
import auth0 from '@/utils/auth0';

export default async function createPortfolio(req, res) {

  try {

    // Получаем access token
    const { accessToken } = await auth0.getSession(req);
    
    // Создаём экземпляр API, передавая токен 
    const api = new PortfolioApi(accessToken);
    
    // Вызываем метод создания портфолио
    const json = await api.createPortfolio(req.body); 

    // Возвращаем данные из ответа
    return res.json(json.data);

  } catch(e) {

    // Обработка ошибки
    return res.status(e.status || 422).json(e.response.data);

  }

}