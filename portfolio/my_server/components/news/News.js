import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import Filters from "@/components/news/Filters";

const News = ({ newsData }) => {
  const [articles, setArticles] = useState(newsData.articles || []);
  const [totalResults, setTotalResults] = useState(newsData.totalResults || 0);
  const router = useRouter();

  let { page = 1, pageSize = 20 } = router.query;
  page = Number(page);
  pageSize = Number(pageSize);

  useEffect(() => {
    setArticles(newsData.articles || []);
    setTotalResults(newsData.totalResults || 0);
  }, [newsData, pageSize]);

  const handlePageChange = (pageNumber) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", pageNumber);
    queryParams.set("pageSize", pageSize);

    router.push({
      pathname: router.pathname,
      search: queryParams.toString(),
    });
  };

  return (
    <div className="container container-fluid">
      <div className="row">
        <div className="col-xl-3 col-lg-4">
          <Filters />
        </div>
        <div className="col-xl-9 col-lg-8 content-left-offset">
          <h4 className="page-title">News Articles</h4>
          {articles.map((article, index) => (
            <div key={index} className="article">
              <h5>{article.title}</h5>
              <p>{article.description}</p>
            </div>
          ))}
          {totalResults > 0 && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={page}
                itemsCountPerPage={pageSize}
                totalItemsCount={totalResults}
                onChange={handlePageChange}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
