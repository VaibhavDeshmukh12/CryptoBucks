import { createContext, useLayoutEffect, useState } from "react";

// create context object
export const CryptoContext = createContext({})

// Provider component
export const CryptoProvider = ({ children }) => {

	const [cryptoData, setCryptoData] = useState();
	const [coinData, setCoinData] = useState();
	const [searchData, setSearchData] = useState();
	const [coinSearch, setCoinSearch] = useState("");
	const [sortBy, setSortBy] = useState("market_cap_desc");
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [totalPage, setTotalPages] = useState(250);
	const [currency, setCurrency] = useState("usd");

	const getCoinData = async (coinId) => {
		setCoinData();
		try {
			const data = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`)
				.then((res) => res.json())
				.then(json => json);
			// console.log(data);
			setCoinData(data);

		} catch (error) {
			console.log('error :>> ', error);
		}
	}

	const getCryptoData = async () => {
		setCryptoData();
		setTotalPages(12190);
		// try {
		// 	const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
		// 		.then((res) => res.json())
		// 		.then(json => json);
			// console.log(data);
		// 	setTotalPages(data.length);
			// console.log('data.length :>> ', data.length);

		// } catch (error) {
		// 	console.log('error :>> ', error);
		// }
		try {
			const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`)
				.then((res) => res.json())
				.then(json => json);
			// console.log(data);
			setCryptoData(data);

		} catch (error) {
			console.log('error :>> ', error);
		}
	}

	const getSearchResult = async (query) => {
		try {
			const data = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`)
				.then((res) => res.json())
				.then(json => json);
			// console.log(data);
			setSearchData(data.coins);

		} catch (error) {
			console.log('error :>> ', error);
		}
	}

	const resetFunc = () =>{
		setPage(1);
		setCoinSearch("")
	}

	useLayoutEffect(() => {
		getCryptoData();
	}, [coinSearch, currency,sortBy,page,perPage]);

	return (
		<CryptoContext.Provider 
		value={{ 
			cryptoData, 
			searchData, 
			getSearchResult, 
			setCoinSearch, 
			setSearchData, 
			currency, 
			setCurrency,
			sortBy, resetFunc,
			setSortBy,
			page, setPage,
			totalPage,
			setPerPage,
			perPage,coinData,
			setCoinData,getCoinData
			}}>

			{children}

		</CryptoContext.Provider>
	)
}

