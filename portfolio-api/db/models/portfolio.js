const mongoose = require('mongoose'); // подключаем mongoose

const Schema = mongoose.Schema; // получаем конструктор Schema из mongoose

// создаем схему Portfolio используя конструктор Schema
const portfolioSchema = new Schema({
  // поле title - строка, обязательное
  title: { type: String, required: true },

  // поле description - строка, необязательное  
  description: String 
}); 

// создаем и экспортируем модель Portfolio 
// на основе схемы portfolioSchema
module.exports = mongoose.model('Portfolio', portfolioSchema);