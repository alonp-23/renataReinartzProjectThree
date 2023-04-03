import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios//
import axios from 'axios'; //pulled from Node modules folder
// import Form from "./components/Form";
import Loader from './Loader';
import Header from './Header';
import Form from './Form';
import Navbar from './Navbar';
import importImg from '../images/productNotFound.png';
import Footer from './Footer';
import Product from './Product';
import Results from './Results';

//products are a variable containing our pieces of products
//setProducts is a function to update products
const Makeup = () => {
  const navigate = useNavigate();
  //use state is setup for products
  const [products, setProducts] = useState([]);
  //Use state is set to filtered products. Filtered products will be rendered to the page.
  const [filteredProducts, setFilteredProducts] = useState([]);
  //filter the price
  const [userChoice, setUserChoice] = useState('');
  const [userPrice, setUserPrice] = useState('');

  const [userQuery, setUserQuery] = useState('');
  const [userPriceQuery, setUserPriceQuery] = useState('');
  //We are setting the default state of loading to true
  const [loading, setLoading] = useState(true);
  //this hook will run only when makeup app mounts
  //this will set the state for the shopping cart/nav menu
  const [openCart, setOpenCart] = useState(false);
  // Creating a handleFormChange function that will update the user product choice state
  // to their selection
  const [cartItems, setCartItems] = useState([]);

  const [formError, setFormError] = useState(false);

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
    console.log(userChoice);
    setUserQuery(userChoice);
    setUserPriceQuery(userPrice);
  };
  // will toggle the open and close of the actual element
  const handleOpenCart = () => {
    // setOpenCart(!openCart)
  };
  //handleAddToCart receives product as an argument that needs to be stored into the cart
  const handleAddToCart = (product) => {
    //check if we have existing cart items in the local storage
    let existingCartItems = JSON.parse(localStorage.getItem('cartItems'));
    console.log({ existingCartItems });
    //if we have existing cartItems then we would append that array of cartItems
    if (existingCartItems) {
      localStorage.setItem(
        'cartItems',
        JSON.stringify([...existingCartItems, product])
      );
    }
    //if we don't have existing cartItems then we will store a new one
    else {
      localStorage.setItem('cartItems', JSON.stringify([product]));
    }

    navigate('/cart');
  };

  useEffect(() => {
    //API request
    axios({
      url: 'https://makeup-api.herokuapp.com/api/v1/products.json',
    })
      .then((response) => {
        setProducts(response.data); //all products will be rendered
        setFilteredProducts(response.data); //filtered products will be
        //rendered.
        //loading is set to false so it will stop loading once products are loaded  on the page
        setLoading(false);
        setFormError(false);
      })
      .catch((error) => setFormError(true)); // sets an error if the API returns and error
  }, []);
  //created a useEffect to store the filtered products which will return the product type
  useEffect(() => {
    const filteredNewProducts = products.filter((product) => {
      return product.product_type === userQuery;
    });
    setFilteredProducts(filteredNewProducts);
  }, [userQuery]);

  const displayProducts = filteredProducts
    .filter((price) => {
      return (
        // filter prices based on selected drop down menu
        userPriceQuery === '1-10'
          ? parseInt(price.price) > 1 && parseInt(price.price) < 10
          : userPriceQuery === '10-15'
          ? parseInt(price.price) > 11 && parseInt(price.price) <= 14
          : userPriceQuery === '15-25'
          ? parseInt(price.price) > 15
          : parseInt(price.price) > 15
      );
      //filtering the products to 20 per page
    })
    .slice(0, 20);

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
        <Results formError={formError} />
        {/* <Form /> */}
        {/* if page is loading then return loader if loading is complete than return products */}
        {loading ? (
          <Loader />
        ) : (
          <div className="products">
            {/* filter the price  */}
            {displayProducts.length === 0 ? (
              <img src={importImg} id="notFound" alt="import"></img>
            ) : (
              <>
                {displayProducts.map((product, index) => (
                  //will load selections from the API
                  <Product
                    key={index}
                    product={product}
                    handleAddToCart={handleAddToCart}
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
