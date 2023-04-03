import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';

const Navbar = (props) => {
  return (
    <div className="wrapper">
      <div className="navbar">
        <div className="links">
          <Link to="/" className="makeup">
            makeup
          </Link>
          <Link to="/cart">
            <button onClick={props.handleOpenCart} className="cartIcon">
              <ShoppingCart size={32} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
