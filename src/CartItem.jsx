import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      // Remove the currency symbol and parse as a float to handle decimals
      const itemCost = parseFloat(item.cost.substring(1));
      const itemQuantity = parseInt(item.quantity);

      // Calculate cost for this item and add it to the running total
      return total + itemCost * itemQuantity;
    }, 0); // Initialize total to 0
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    const name = item.name;
    const quantity = item.quantity + 1;
    dispatch(updateQuantity({ name, quantity }));
  };

  const handleDecrement = (item) => {
    const name = item.name;
    const quantity = item.quantity - 1;
    if (quantity > 0) {
      dispatch(updateQuantity({ name, quantity }));
    } else {
      dispatch(removeItem(name));
    }
  };

  const handleRemove = (item) => {
    const name = item.name;
    dispatch(removeItem(name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Remove the currency symbol and parse as a float to handle decimals
    const itemCost = parseFloat(item.cost.substring(1));
    const itemQuantity = parseInt(item.quantity);
    return itemCost * itemQuantity;
  };

  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={(e) => handleCheckoutShopping(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
