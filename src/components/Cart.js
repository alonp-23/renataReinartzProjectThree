import React, { useState, useEffect } from 'react';
import { Trash } from 'phosphor-react';
import Coupon from './Coupon';
import Footer from './Footer';
import Navbar from './Navbar';

const Cart = () => {
  // State variables
  const [cartItems, setCartItems] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItemTotalPrice, setCartItemTotalPrice] = useState({});
  console.log(cartItemTotalPrice);
  // Function to handle quantity change
  const handleQuantityChange = (event, itemId) => {
    // Logic for updating the cart items' quantity and their total price
    const newQuantity = parseInt(event.target.value) || 1;
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const newTotalPrice = newQuantity * item.price;
        setCartItemTotalPrice({
          ...cartItemTotalPrice,
          [itemId]: newTotalPrice,
        });
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);

    // Update quantity in local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  function handleKeyDown(event) {
    if (event.key === '-' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  // Function to handle deleting a cart item
  const handleDeleteCartItem = (cartItem) => {
    let filteredCartItems = cartItems.filter((item) => item.id !== cartItem.id);

    setCartItems(filteredCartItems);
    localStorage.setItem('cartItems', JSON.stringify(filteredCartItems));
  };
  // Effect to retrieve cart items from local storage and setting them as state
  useEffect(() => {
    const carts = localStorage.getItem('cartItems');
    if (carts) {
      const parsedCarts = JSON.parse(carts);
      const cartItemsWithQuantity = parsedCarts.map((item) => ({
        ...item,
        quantity: 1,
      }));
      setCartItems(cartItemsWithQuantity);
      setCartItemTotalPrice(
        cartItemsWithQuantity.reduce(
          (acc, item) => ({ ...acc, [item.id]: item.price }),
          {}
        )
      );
    } else {
      setCartItems(null);
      setCartItemTotalPrice({});
    }
  }, []);

  useEffect(() => {
    // Calculate the total price of all items in the cart
    let total = 0;
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((cartItem) => {
        total += cartItem.price * cartItem.quantity;
      });
      setTotalPrice(total);
    }
  }, [cartItems]);

  return (
    <>
      <Navbar />

      <div className="wrapper text-white">
        <h2 className="shopping">Shopping Cart</h2>
        <section id="cart-container" className="container">
          <table width="100%">
            <thead>
              <tr>
                <td>Remove</td>
                <td>Image</td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Total</td>
              </tr>
            </thead>
          </table>
        </section>

        {cartItems === null ||
          (cartItems.length === 0 && (
            <tr>
              <td colSpan="6">
                <h1>Your cart is empty!</h1>
              </td>
            </tr>
          ))}
        {cartItems &&
          cartItems.length > 0 &&
          cartItems.map((cartItem, index) => {
            return (
              <section id="cart-container" className="container">
                <table width="100%">
                  <tbody>
                    <tr key={cartItem.id} className="border">
                      <td>
                        <button
                          className="trash-can"
                          onClick={() => handleDeleteCartItem(cartItem)}
                        >
                          <Trash size={24} />
                        </button>
                      </td>
                      <td className="image">
                        <img
                          className="cartImage"
                          src={cartItem.api_featured_image}
                          alt={cartItem.name}
                        />
                      </td>
                      <td>
                        <h3>{cartItem.name}</h3>
                      </td>
                      <td>
                        <p>${cartItem.price}</p>
                      </td>
                      <td>
                        <input
                          className="quantity"
                          key={cartItem.id}
                          onChange={(event) =>
                            handleQuantityChange(event, cartItem.id)
                          }
                          onKeyDown={handleKeyDown}
                          value={cartItem.quantity}
                          type="number"
                        ></input>
                      </td>
                      <td>
                        <span>
                          ${(cartItem.price * cartItem.quantity).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            );
          })}
      </div>
      <Coupon totalPrice={totalPrice} />
      <Footer />
    </>
  );
};
export default Cart;
