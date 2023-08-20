import axios from 'axios';

// Функция для создания нового портфолио 
export function createPortfolio(data) {
  
  // Делаем POST запрос на endpoint /api/v1/portfolios
  // Передаем объект data в качестве body запроса

  return axios.post('/api/v1/portfolios', data); 
  
  // Axios вернет Promise, 
  // который можно обработать при вызове функции

}