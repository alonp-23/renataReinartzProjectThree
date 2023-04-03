import React, { useState } from 'react';
const Coupon = ({ totalPrice }) => {
  const [myValue, setMyValue] = useState('');
  const handleInputChange = (e) => {
    setMyValue(e.target.value);
  };
  return (
    <section id="cart-bottom" className="container">
      <div className="wrapper">
        <div className="row">
          <div className="coupon">
            <h5>Coupon</h5>
            <p>Enter your coupon code if you have one</p>
            <div className="flex">
              <input
                type="text"
                placeholder="Coupon Code"
                value={myValue}
                onChange={handleInputChange}
              />
              <button className="apply-coupon">Apply Coupon</button>
            </div>
          </div>
          <div className="total">
            <h5>Cart Total</h5>
            <div className="flex space-btn">
              <h6>Subtotal</h6>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            {/* <hr className="second-hr"> */}
            <div className="flex space-btn">
              <h6>Shipping</h6>
              <p>$20.00</p>
            </div>
            {/* </hr> */}
            <div className="flex-end">
              <button className="checkout">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Coupon;
