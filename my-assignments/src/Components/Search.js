import React, { useState } from "react";
import "../../src/App.css";

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="search-container">
      <label htmlFor="searchInput" className="search-label">
        Search Products
      </label>
      <input
        type="text"
        id="searchInput"
        placeholder="Search by Title or Description"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  );
}

export default Search;
