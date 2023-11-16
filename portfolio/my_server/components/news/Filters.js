import React from "react";
import { useRouter } from "next/router";


const Filters = () => {
  const router = useRouter();
  let queryParams;

  if (typeof window !== "undefined") {
    queryParams = new URLSearchParams(window.location.search);
  }

  const countries = ["at", "be", "bg", "cz", "de", "dk", "ee", "es", "fi", "fr", "gb", "gr", "hu", "ie", "it", "lt", "lu", "lv", "mt", "nl", "pl", "pt", "ro", "se", "si", "sk"];
  const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
  const pageSizes = [5, 10, 15, 20];
  const pages = [1, 2, 3, 4, 5];

  const updateQueryParams = (name, value, checked) => {
    if (checked) {
      queryParams.set(name, value);
    } else {
      queryParams.delete(name);
    }
    router.replace({ search: queryParams.toString() });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    updateQueryParams(name, value, checked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateQueryParams(name, value, value !== '');
  };

  const isChecked = (name, value) => queryParams.get(name) === value;

  return (
    <div className="sidebar mt-5">
      <h3>Filters</h3>
      <hr />
      {/* Query Filter */}
      <h5 className="filter-heading mb-3">Search Query</h5>
      <input
        className="form-control mb-3"
        type="text"
        name="q"
        placeholder="Search..."
        value={queryParams.get('q') || ''}
        onChange={handleInputChange}
      />
      {/* Country Filter */}
      <h5 className="filter-heading mb-3">Country</h5>
      {countries.map((country) => (
        <div className="form-check" key={country}>
          <input
            className="form-check-input"
            type="checkbox"
            name="country"
            id={`country-${country}`}
            value={country}
            checked={isChecked("country", country)}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor={`country-${country}`}>
            {country.toUpperCase()}
          </label>
        </div>
      ))}

      {/* Category Filter */}
      <h5 className="filter-heading mb-3">Category</h5>
      {categories.map((category) => (
        <div className="form-check" key={category}>
          <input
            className="form-check-input"
            type="checkbox"
            name="category"
            id={`category-${category}`}
            value={category}
            checked={isChecked("category", category)}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor={`category-${category}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </label>
        </div>
      ))}



      {/* PageSize Filter */}
      <h5 className="filter-heading mb-3">Page Size</h5>
      {pageSizes.map((size) => (
        <div className="form-check" key={size}>
          <input
            className="form-check-input"
            type="radio"
            name="pageSize"
            id={`pageSize-${size}`}
            value={size}
            checked={isChecked("pageSize", size.toString())}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor={`pageSize-${size}`}>
            {size}
          </label>
        </div>
      ))}

      {/* Page Filter */}
      <h5 className="filter-heading mb-3">Page</h5>
      {pages.map((page) => (
        <div className="form-check" key={page}>
          <input
            className="form-check-input"
            type="radio"
            name="page"
            id={`page-${page}`}
            value={page}
            checked={isChecked("page", page.toString())}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor={`page-${page}`}>
            {page}
          </label>
        </div>
      ))}

      <hr />
    </div>
  );
};

export default Filters;