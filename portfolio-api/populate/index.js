// Подключаем модули
const config = require('../config'); 
// модуль с конфигом подключения к БД

const mongoose = require('mongoose');
// модуль для работы с MongoDB 

const fakeDB = require('./FakeDB');
// модуль с методами генерации тестовых данных


// Подключаемся к MongoDB
mongoose.connect(config.DB_URI, {
  // передаем строку подключения из config
  // и опции подключения
}).then(async () => {
  
  // Логируем начало процесса
  console.log('> Starting populating DB...');
  
  // Заполняем БД тестовыми данными 
  await fakeDB.populate();

  // Закрываем подключение
  await mongoose.connection.close();

  // Логируем успешное заполнение БД
  console.log('> DB has been populated...');

})

// Обработчик ошибки подключения 
.catch(err => {
  console.error(err);
});