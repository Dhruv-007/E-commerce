import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "../../src/App.css";

function Navbar({ onClick }) {
  return (
    <div className="navbar-container">
      <div className="left-section">
        <Link to="/shop" className="nav-link">
          Store
        </Link>
      </div>
      <div className="right-section">
        <FaShoppingCart onClick={onClick} className="cart-icon" />
      </div>
    </div>
  );
}

export default Navbar;
