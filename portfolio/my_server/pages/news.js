// pages/news.js
import React from 'react';
import axios from 'axios';
import NewsComponent from '../components/NewsComponent';
import BaseLayout from '@/components/layouts/BaseLayout';
import Masthead from 'components/shared/Masthead';
import BasePage from '@/components/BasePage';

const NewsPage = ({ articles }) => {


  return (
    <BaseLayout navClass="transparent" className="blog-listing-page" >
      <Masthead imagePath="/images/news_bg.png">
        <h2>API Integrations</h2>
        <span className="subheading">from https://newsapi.org/</span>
      </Masthead>
      <BasePage title="News - Denis Osipov" className="blog-body">  
      <NewsComponent articles={articles} />
      </BasePage>
    </BaseLayout>
  );
};

export async function getServerSideProps() {
  const localhost = 'http://localhost:3001'; // Adjust URL as needed
  let articles = [];

  try {
    const response = await axios.get(`${localhost}/api/v1/news`);
    articles = response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
  }

  return {
    props: {
      articles,
    },
  };
}

export default NewsPage;
