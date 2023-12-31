// Импорт конфигурации для dev среды 
const config = require('../config');

// Импорт mongoose - ОРМ для MongoDB
const mongoose = require('mongoose');

require('./models/portfolio');
require('./models/blog'); 

// Экспорт объекта с методом подключения к БД
exports.connect = () => {
    return mongoose.connect(
      config.DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(
        () => console.log('Connected to DB!'),
        err => console.error(err)
      )
    }