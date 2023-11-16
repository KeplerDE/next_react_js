import React from 'react';


const NewsComponent = ({ articles }) => {
  return (
    <div className="newsContainer">
      {articles.map((article, index) => (
        <div className="newsItem" key={index}>
          <h2 className="newsTitle">{article.title}</h2>
          {article.urlToImage && (
            <img src={article.urlToImage} alt={article.title} className="newsImage" />
          )}
          <p className="newsDescription">{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="newsLink">Read more...</a>
        </div>
      ))}
    </div>
  );
};

export default NewsComponent;