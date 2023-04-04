import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

import { defaultQueryParameters } from "../components/Makeup";

export const productsContext = createContext({});

export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [queryParameters, setQueryParameters] = useState('');
	const [hasFailed, setHasFailed] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		axios({
			url: `https://makeup-api.herokuapp.com/api/v1/products.json?${queryParameters || defaultQueryParameters}`,
		}).then(({ data }) => {
			setProducts(data);
			setHasFailed(false);
		}).catch(() => {
			setHasFailed(true)
		})
		.finally(() => {
			setIsLoading(false)
		});
	}, [queryParameters]);

	return (
		<productsContext.Provider value={{products, isLoading, setQueryParameters, hasFailed}}>
			{children}
		</productsContext.Provider>
	)
};

export const useProductsStore = () => useContext(productsContext);
