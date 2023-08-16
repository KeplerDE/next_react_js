

const express = require('express');
const server = express();
const config = require('./config/dev');

// Импортируем mongoose
const mongoose = require('mongoose'); 

// Функция для подключения к базе данных 
async function connectToDb() {

  // Используем async/await
  try {
    
    // Подключаемся и передаем параметры  
    await mongoose.connect(config.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Connected to DB!');
    
  } catch (error) {
    console.log('Connection error', error);
  }

}

// Вызываем функцию подключения
connectToDb();

server.use('/api/v1/portfolios', require('./routes/portfolios'));

const PORT = parseInt(process.env.PORT, 10) || 3001;
server.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log('Server ready on port:', PORT);
})