// Импортируем данные для заполнения БД 
const { portfolios, blogs } = require('./data');

// Импортируем модель Portfolio
const Portfolio = require('../db/models/portfolio');
const Blog = require('../db/models/blog');

// Класс FakeDB для заполнения БД тестовыми данными
class FakeDB {

  // Метод очистки коллекции
  async clean() {
    await Portfolio.deleteMany({}); 
    await Blog.deleteMany({});
  }

  // Метод добавления тестовых данных
  async addData() {
    await Portfolio.create(portfolios);
    await Blog.create(blogs);
  }

  // Метод заполнения - сначала очистка, потом добавление
  async populate() {
    await this.clean();
    await this.addData();
  }

}

// Экспортируем экземпляр класса 
module.exports = new FakeDB();