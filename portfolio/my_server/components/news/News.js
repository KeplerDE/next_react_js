import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import { useRouter } from "next/router";
import Filters from "./Filters";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const router = useRouter();
  const queryParams = new URLSearchParams(window.location.search);

  // API settings
  const API_KEY = ""; // Replace with your API key
  const BASE_URL = "https://newsapi.org/v2/top-headlines";

  // Fetch news articles based on query parameters
  const fetchNews = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apiKey: API_KEY,
          country: queryParams.get("country"),
          category: queryParams.get("category"),
          q: queryParams.get("q"),
          pageSize: queryParams.get("pageSize") || 20,
          page: queryParams.get("page") || 1,
        },
      });
      setArticles(response.data.articles);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // Effect to fetch news on component mount and when query params change
  useEffect(() => {
    fetchNews();
  }, [router.query]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    queryParams.set("page", pageNumber);
    router.push(`/?${queryParams.toString()}`, undefined, { shallow: true });
    fetchNews(); // Refetch news with the new page number
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
              {/* Add more article details as needed */}
            </div>
          ))}

          {totalResults > 0 && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={parseInt(queryParams.get("page")) || 1}
                itemsCountPerPage={parseInt(queryParams.get("pageSize")) || 20}
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
