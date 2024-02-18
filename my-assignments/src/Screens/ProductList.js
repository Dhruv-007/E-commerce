import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import FilterComponent from "../Components/Filter";
import Search from "../Components/Search";
import CartPage from "./CartPage";
import Modal from "react-modal";
import Navbar from "../Components/Navbar";

const ProductList = () =>  {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([
    "All",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
  ]);
  const [viewCart, setViewCart] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    category: "All",
    minPrice: "",
    maxPrice: "",
  });
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [addedProductIds, setAddedProductIds] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFilterChange = (newFilterCriteria) => {
    setFilterCriteria(newFilterCriteria);
    applyFilter(newFilterCriteria);
  };

  const applyFilter = ({ category, minPrice, maxPrice }) => {
    let filtered = products;

    if (category !== "All") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (minPrice !== "" && !isNaN(minPrice)) {
      filtered = filtered.filter(
        (product) => product.price >= Number(minPrice)
      );
    }

    if (maxPrice !== "" && !isNaN(maxPrice)) {
      filtered = filtered.filter(
        (product) => product.price <= Number(maxPrice)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setSortOrder((prevOrder) =>
      criteria === sortCriteria ? (prevOrder === "asc" ? "desc" : "asc") : "asc"
    );
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const compareValue = sortOrder === "asc" ? 1 : -1;
    const propA = a[sortCriteria];
    const propB = b[sortCriteria];

    if (sortCriteria === "price") {
      return (propA - propB) * compareValue;
    } else if (sortCriteria === "name") {
      const nameA = propA || "";
      const nameB = propB || "";
      return nameA.localeCompare(nameB) * compareValue;
    }

    return 0;
  });

  const searchedAndSortedProducts = sortedProducts.filter((product) => {
    const productName = (product.name || "").toLowerCase();
    const productDescription = (product.description || "").toLowerCase();
    const query = searchedQuery.toLowerCase();
    return productName.includes(query) || productDescription.includes(query);
  });

  const handleAddToCard = (productId) => {
    setAddedProductIds((prevIds) => [...prevIds, productId]);
  };

  const handleProceed = (totalQuantity) => {
    console.log("Total Quantity:", totalQuantity);
  };
  return (
    <div>
      <Navbar onClick={() => setViewCart(true)} />
      <Search onSearch={setSearchedQuery} />
      <FilterComponent
        categories={categories}
        onFilterChange={handleFilterChange}
      />
      <div style={{ marginLeft: "20px" }}>
        <label>Sort by:</label>
        <select
          value={sortCriteria}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
        <button onClick={() => handleSortChange(sortCriteria)}>Asc</button>
      </div>
      <div className="product-list">
        {Array.isArray(searchedAndSortedProducts) &&
        searchedAndSortedProducts.length > 0 ? (
          searchedAndSortedProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
              onAddToCard={handleAddToCard}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <div>
        {viewCart && (
          <Modal
            isOpen={viewCart}
            onRequestClose={() => setViewCart(false)}
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                transform: "translate(-50%, -50%)",
                overflowY: "scroll",
              },
            }}
          >
            <CartPage
              addedProductIds={addedProductIds}
              products={products}
              onProceed={handleProceed}
            />
            <button onClick={() => setViewCart(false)}>Close</button>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ProductList;
