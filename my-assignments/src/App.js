import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const ProductList = lazy(() => import("./Screens/ProductList"));
const ProductDetails = lazy(() => import("./Screens/ProductDetails"));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/products/:productId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductList />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
