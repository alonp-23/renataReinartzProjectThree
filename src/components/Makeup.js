import { useState } from 'react';
// import Form from "./components/Form";
import Loader from './Loader';
import Header from './Header';
import Form, { priceOption, productType } from './Form';
import Navbar from './Navbar';
import importImg from '../images/productNotFound.png';
import Footer from './Footer';
import Product from './Product';
import Results from './Results';
import { useProductsStore } from '../contexts/products';

// according to the search parameters provided in the api docs
const filterByPriceOptions = {
  [priceOption.oneToTen]: 'price_greater_than=1&price_less_than=10',
  [priceOption.tenToFifteen]: 'price_greater_than=10&price_less_than=15',
  [priceOption.fifteenToThirty]: 'price_greater_than=15&price_less_than=30'
}

const filterByProductType = {
  [productType.eyeliner]: 'product_type=eyeliner',
  [productType.eyeshadow]: 'product_type=eyeshadow',
  [productType.foundation]: 'product_type=foundation',
  [productType.lipstick]: 'product_type=lipstick',
  [productType.powder]: 'product_type=powder'
}

const formatQueryParameters = (...parameters) => parameters.reduce((result, current) => `${result}${current}&`, '');

export const defaultQueryParameters = formatQueryParameters(filterByPriceOptions[priceOption.oneToTen], filterByProductType[productType.eyeliner]);

//products are a variable containing our pieces of products
//setProducts is a function to update products
const Makeup = () => {
  const [userChoice, setUserChoice] = useState('');
  const [userPrice, setUserPrice] = useState('');
  //this hook will run only when makeup app mounts
  //this will set the state for the shopping cart/nav menu
  // eslint-disable-next-line
  const [openCart, setOpenCart] = useState(false);

  const {products, isLoading: loading, setQueryParameters, hasFailed} = useProductsStore();
  
  // Creating a handleFormChange function that will update the user product choice state
  const handleFormChange = (event) => {
    setUserChoice(event.target.value);
  };
  // Creating a handlePriceChange function that will update the user price choice state based on their selection
  const handlePriceChange = (event) => {
    setUserPrice(event.target.value);
  };

  //handleFormSubmit function will prevent the form from refreshing
  const handleFormSubmit = (event) => {
    event.preventDefault();

    setQueryParameters(formatQueryParameters(filterByProductType[userChoice], filterByPriceOptions[userPrice]))
  };
  // will toggle the open and close of the actual element
  const handleOpenCart = () => {
    // setOpenCart(!openCart)
  };

  return (
    <>
      <Navbar handleOpenCart={handleOpenCart} />
      {openCart && (
        <ul>
          <li>Hello</li>
        </ul>
      )}
      <Header />
      <div className="wrapper">
        {/* passing the props from makeup AKA parent to the form AKA child */}
        <Form
          handleFormChange={handleFormChange}
          handlePriceChange={handlePriceChange}
          handleFormSubmit={handleFormSubmit}
          userChoice={userChoice}
          userPrice={userPrice}
        />
        <Results formError={hasFailed} />
        {/* <Form /> */}
        {/* if page is loading then return loader if loading is complete than return products */}
        {loading ? (
          <Loader />
        ) : (
          <div className="products">
            {/* filter the price  */}
            {products.length === 0 ? (
              <img src={importImg} id="notFound" alt="import"></img>
            ) : (
              <>
                {products.map((product, index) => (
                  //will load selections from the API
                  <Product
                    key={index}
                    product={product}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Makeup;
