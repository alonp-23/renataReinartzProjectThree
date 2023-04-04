import React, { useState, useEffect } from 'react';
import { Trash } from 'phosphor-react';
import Coupon from './Coupon';
import Footer from './Footer';
import Navbar from './Navbar';
import { useCart } from '../contexts/cart';

const Cart = () => {
  // State variables
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart, addToCart, removeFromCart } = useCart();
  
  // Function to handle quantity change
  const handleQuantityChange = (event, itemId) => {
    // Logic for updating the cart items' quantity
    const newAmount = parseInt(event.target.value) || 1;
    const updatedCartItem = {product: cart.find(({product}) => product.id === itemId), amount: newAmount};
      
    addToCart(updatedCartItem);
  };

  // Function to handle deleting a cart item
  const handleDeleteCartItem = (product) => {
    removeFromCart(product)
  };

  useEffect(() => {
    // Calculate the total price of all items in the cart
    let total = 0;
    if (cart && cart.length > 0) {
      cart.forEach(({product, amount}) => {
        total += product.price * amount;
      });
      setTotalPrice(total);
    }
  }, [cart]);

  return (
    <>
      <Navbar />
      <div className="wrapper text-white">
        <h2 className="shopping">Shopping Cart</h2>
        <section id="cart-container" className="container">
          <table className='cart-table'>
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
            <tbody>
              {
                (cart.length === 0 && (
                <tr>
                  <td colSpan="6">
                    <h1>Your cart is empty!</h1>
                  </td>
                </tr>))
              }
              {
                cart.length > 0 &&
                cart.map(({product, amount}) => {
                  return (
                    <tr key={product.id} className="border">
                      <td>
                        <button
                          className="trash-can"
                          onClick={() => handleDeleteCartItem(product)}
                        >
                          <Trash size={24} />
                        </button>
                      </td>
                      <td className="image">
                        <img
                          className="cartImage"
                          src={product.api_featured_image}
                          alt={product.name}
                        />
                      </td>
                      <td>
                        <h3>{product.name}</h3>
                      </td>
                      <td>
                        <p>${product.price}</p>
                      </td>
                      <td>
                        <input
                          className="quantity"
                          key={product.id}
                          onChange={(event) =>
                            handleQuantityChange(event, product.id)
                          }
                          value={amount}
                          type="number"
                        ></input>
                      </td>
                      <td>
                        <span>
                          ${(product.price * amount).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </section>
      </div>
      <Coupon totalPrice={totalPrice} />
      <Footer />
    </>
  );
};
export default Cart;
