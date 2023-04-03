const Product = (props) => {
  const { product, handleAddToCart } = props;
  return (
    <div className="product-container">
      <img src={`https://${product.api_featured_image}`} alt=""></img>
      <p className="name">{product.name}</p>
      <p className="price">PRICE:${Number(product.price).toFixed(2)}</p>
      <div className="buttons">
        <button
          onClick={() => handleAddToCart(product)}
          className="addToCartBttn"
          id={product.id}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default Product;
