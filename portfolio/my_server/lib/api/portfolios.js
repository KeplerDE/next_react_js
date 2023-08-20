// Импорт axios для запросов
import axios from 'axios';

class PortfolioApi {

  // Конструктор класса
  constructor() {
    this.apiUrl = process.env.PORTFOLIO_API_URL + '/portfolios'; // Базовый URL
  }

  // Метод для получения всех портфолио
  getAll() {
    return axios.get(this.apiUrl) 
  }

  // Метод для получения портфолио по ID
  getById(id) {
    return axios.get(`${this.apiUrl}/${id}`)
  }

  createPortfolio(data) {
    return axios.post(this.apiUrl, data);
  }

}

// Экспорт класса 
export default PortfolioApi;