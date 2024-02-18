import React, { useState } from "react";
import "../../src/App.css";

function FilterComponent({ categories, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onFilterChange({
      category: event.target.value,
      minPrice,
      maxPrice,
    });
  };

  const handlePriceChange = () => {
    onFilterChange({
      category: selectedCategory,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div className="filter-component">
      <label>Category:</label>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label>Price Range:</label>
      <div className="price-inputs">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onBlur={handlePriceChange}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onBlur={handlePriceChange}
        />
      </div>
    </div>
  );
}

export default FilterComponent;
