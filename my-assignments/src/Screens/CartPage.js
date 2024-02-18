import React from "react";

const CartPage = ({ addedProductIds, products, onProceed }) => {
  const cartProducts = products.filter((product) =>
    addedProductIds.includes(product.id)
  );

  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, product) => {
      const quantity = addedProductIds.filter((id) => id === product.id).length;
      return total + product.price * quantity;
    }, 0);
  };

  const handleProceed = () => {
    const totalQuantity = cartProducts.reduce((sum, product) => {
      return sum + addedProductIds.filter((id) => id === product.id).length;
    }, 0);

    const totalPrice = calculateTotalPrice();

    onProceed(totalQuantity, totalPrice);
  };

  return (
    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
      <h2>Cart</h2>

      {cartProducts.map((product) => (
        <div
          style={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "red",
            marginTop: 10,
          }}
        >
          <div key={product.id}>
            <p>{product.title}</p>
            <img src={product.thumbnail} alt={product.title} />
            <p>Price: ${product.price}</p>
            <p>
              Quantity:{" "}
              {addedProductIds.filter((id) => id === product.id).length}
            </p>
          </div>
        </div>
      ))}

      <p>Total Products Quantity: {addedProductIds.length}</p>
      <p>Total Price: ${calculateTotalPrice()}</p>
      <button onClick={handleProceed}>Proceed</button>
    </div>
  );
};

export default CartPage;
