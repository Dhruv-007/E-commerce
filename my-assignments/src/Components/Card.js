import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Card = ({ product, onAddToCard }) => {
  const [counter, setCounter] = useState(0);

  const handleAddToCard = () => {
    onAddToCard(product.id);
    setCounter(counter + 1);
  };

  return (
    <>
      <div className="card" style={cardStyle}>
        <Link
          to={{
            pathname: `/products/${product.id}`,
            state: { productDetails: product },
          }}
          className="product-link"
        >
          <div className="product-details">
            <img
              src={product?.thumbnail}
              alt={product?.title}
              style={imageStyle}
            />
            <h3 style={productNameStyle}>{product?.title}</h3>
            <p style={productPriceStyle}>${product?.price}</p>
            <p style={productDescriptionStyle}>{product?.description}</p>
          </div>
        </Link>

        <div style={addToCartContainerStyle}>
          <button style={addToCartButtonStyle} onClick={handleAddToCard}>
            Add to Cart
          </button>
          <p style={counterStyle}>Total Products Added: {counter}</p>
        </div>
      </div>
    </>
  );
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const imageStyle = {
  width: "100%",
  maxHeight: "200px",
  objectFit: "cover",
  borderRadius: "8px",
};

const productNameStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "8px",
};

const productPriceStyle = {
  fontSize: "16px",
  color: "green",
  marginBottom: "8px",
};

const productDescriptionStyle = {
  fontSize: "14px",
  marginBottom: "12px",
};

const addToCartContainerStyle = {
  marginTop: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const addToCartButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px",
  borderRadius: "4px",
  cursor: "pointer",
  marginBottom: "8px",
};

const counterStyle = {
  fontSize: "14px",
  color: "#555",
};

export default Card;
