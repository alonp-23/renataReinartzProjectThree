import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext({});

export const CartProvider = ({children}) => {
	const [cart, setCart] = useState([]);

	const addToCart = (product, amount) => {
		setCart(currentCart => {
			const index = currentCart.findIndex(x => x.product.id === product.id);
			const productCartInfo = index > -1 ? currentCart.splice(index, 1)[0] : {};
				
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

	useEffect(() => {
		const startingCart = localStorage.getItem('cart');
		
		if (!!startingCart) {
			setCart(JSON.parse(startingCart));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart]);

	return (
		<cartContext.Provider value={{cart, addToCart, removeFromCart}}>
			{children}
		</cartContext.Provider>
	)
};

export const useCart = () => useContext(cartContext);