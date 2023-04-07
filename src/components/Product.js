import { useRef } from "react";
import { useCart } from "../contexts/cart";

const Product = ({ product }) => {
  const amount = useRef();
  const { addToCart } = useCart();

  return (
    <div className="product-container">
      <img src={`https://${product.api_featured_image}`} alt=""></img>
      <p className="name">{product.name}</p>
      <p className="price">PRICE:${Number(product.price).toFixed(2)}</p>
      <div className="buttons">
        <button
          onClick={() => addToCart(product, +amount.current.value)}
          className="add-button"
          id={product.id}
        >
          Add to Cart
        </button>
        <input ref={amount} defaultValue={1} min={1} className='amount-button' about='amount' type='number' />
      </div>
    </div>
  );
};
export default Product;
