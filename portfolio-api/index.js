// Импорт модуля express 
const express = require('express');

// Создание экземпляра приложения express
const server = express();
const bodyParser = require('body-parser');


// Описание асинхронной функции запуска сервера
async function runServer() {

  // Подключение к базе данных 
  await require('./db').connect();
  
  server.use(bodyParser.json());
  
  // Регистрация маршрута для CRUD операций с портфолио и блогами
  server.use('/api/v1/portfolios', require('./routes/portfolios'));
  server.use('/api/v1/blogs', require('./routes/blogs'));

  // Регистрация маршрута новостей
  server.use('/api/v1/news', require('./routes/news'));
  server.use('/api/v1/news_query', require('./routes/newsRoutes'));
  // Получение номера порта из ENV или 3001 по умолчанию
  const PORT = parseInt(process.env.PORT, 10) || 3001;

  // Запуск сервера на указанном порту
  server.listen(PORT, (err) => {
    
    // Обработка ошибки, если сервер не запустился
    if (err) console.error(err);
    
    // Логирование успешного запуска сервера
    console.log('Server ready on port:', PORT);
    
  });
}

// Вызов функции запуска сервера 
runServer();
