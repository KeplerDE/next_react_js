// pages/news.js
import React from 'react';
import axios from 'axios';
import NewsComponent from '../components/NewsComponent';

const NewsPage = ({ articles }) => {
  return (
    <NewsComponent articles={articles} />
  );
};

export async function getServerSideProps() {
  // Указываем полный URL для запроса в локальной среде разработки
  // В продакшн этот URL должен быть изменен на адрес развернутого API
  const localhost = 'http://localhost:3001'; // Или используйте переменную окружения
  let articles = [];

  try {
    // Используем полный URL в запросе
    const response = await axios.get(`${localhost}/api/v1/news`);
    articles = response.data.articles;
    console.log(articles); // Логирование для проверки данных
  } catch (error) {
    console.error('Ошибка при получении новостей на стороне сервера:', error);
  }

  return {
    props: {
      articles,
    },
  };
}

export default NewsPage;
