// Импортируем данные для заполнения БД 
const { portfolios } = require('./data');

// Импортируем модель Portfolio
const Portfolio = require('../db/models/portfolio');

// Класс FakeDB для заполнения БД тестовыми данными
class FakeDB {

  // Метод очистки коллекции
  async clean() {
    await Portfolio.deleteMany({}); 
  }

  // Метод добавления тестовых данных
  async addData() {
    await Portfolio.create(portfolios);
  }

  // Метод заполнения - сначала очистка, потом добавление
  async populate() {
    await this.clean();
    await this.addData();
  }

}

// Экспортируем экземпляр класса 
module.exports = new FakeDB();