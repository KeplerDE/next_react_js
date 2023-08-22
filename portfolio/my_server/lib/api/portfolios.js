// Импортируем axios
import axios from 'axios'; 

class PortfolioApi {

  // Конструктор принимает access token
  constructor(accessToken) {

    this.config = {}

    // Если есть токен - добавляем его в заголовки запросов
    if (accessToken) {
      this.config.headers = {
        authorization: `Bearer ${accessToken}`  
      }
    }

    this.apiUrl = process.env.PORTFOLIO_API_URL + '/portfolios';

  }

  // Методы для запросов к API
  getById(id) {
    return axios.get(`${this.apiUrl}/${id}`);
  }
  

  getAll() {
    return axios.get(this.apiUrl)
  }

  getById(id) {
    return axios.get(`${this.apiUrl}/${id}`) 
  }

  createPortfolio(data) {
    return axios.post(this.apiUrl, data, this.config);
  }

}

// Экспорт класса API
export default PortfolioApi;