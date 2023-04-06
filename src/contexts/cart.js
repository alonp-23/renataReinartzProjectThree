import { createContext, useContext, useState } from "react";

const cartContext = createContext({});

export const CartProvider = ({children}) => {
	const [cart, setCart] = useState([]);

	const addToCart = (product, amount) => {
		setCart(currentCart => {
			console.log(currentCart)
			const index = currentCart.findIndex(x => x.product.id === product.id);
			const productCartInfo = index > -1 ? currentCart.splice(index, 1)[0] : {};
				
			productCartInfo.product = product;
			productCartInfo.amount = amount;
			console.log(currentCart)
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