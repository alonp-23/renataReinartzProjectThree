import { createContext, useContext, useState } from "react";

const cartContext = createContext({});

export const CartProvider = ({children}) => {
	const [cart, setCart] = useState([]);

	const addToCart = (product, amount) => {
		setCart(currentCart => {
			const productCartInfo = currentCart.pop(x => x.product.id === product.id) || {};
				
			productCartInfo.product = product;
			productCartInfo.amount = amount;

			return [...currentCart, productCartInfo];
		});
	}

	const removeFromCart = (product) => {
		setCart(currentCart => {
			currentCart.pop(x => x.product.id === product.id);

			return [ ...currentCart ];
		});
	}

	return (
		<cartContext.Provider value={{cart, addToCart, removeFromCart}}>
			{children}
		</cartContext.Provider>
	)
};

export const useCart = () => useContext(cartContext);