import React, { useContext, useState } from 'react'
import searchIcon from '../assets/search-icon.svg'
import { CryptoContext } from '../context/CryptoContext';
import debounce from 'lodash.debounce';

const SearchInput = ({ handlSearch }) => {

	const [searchText, setSearchText] = useState("");
	const { searchData,setCoinSearch,setSearchData } = useContext(CryptoContext);

	let handleInput = (e) => {
		e.preventDefault();
		let query = e.target.value
		setSearchText(query);
		handlSearch(query);
	}
	let handleSubmit = (e) => {
		e.preventDefault();
		handlSearch(searchText);
	}

	const selectCoin = (coin) =>{
		setCoinSearch(coin);
		setSearchText("");
		setSearchData();
	}

	return (
		<>
			<form onSubmit={handleSubmit}
			className='w-96 relative flex items-center ml-7 font-nunito'>
				<input type="text" name="Search"
					value={searchText}
					onChange={handleInput}
					className='w-full rounded bg-gray-200 
                placeholder:text-gray-100 pl-2 required 
                outline-none border border-transparent focus:border-cyan'
					placeholder='Search Here'
				/>
				<button type='submit' className='absolute right-1 cursor-pointer'>
					<img src={searchIcon} className='w-full h-auto' alt="search" />
				</button>
			</form>
			{
				searchText.length > 0 ?
					<ul className='absolute top-11 right-0 w-96 h-96 rounded
                        overflow-x-hidden py-2 bg-gray-200 bg-opacity-60
                        backdrop-blur-md scrollbar-thin scrollbar-thumb-gray-100
						scrollbar-track-gray-200'
					>
						{
							searchData ?
								searchData.map((coin) => {
									return (
										<li key={coin.id} className='flex items-center ml-4 my-2 
											cursor-pointer'
											onClick={()=>selectCoin(coin.id)}
											>
											<img className='w-[1rem] h-[1rem] mx-1.5' 
											src={coin.thumb} alt={coin.name} />
											<span>{coin.name}</span>
										</li>
									)
								})
								: <div className='h-full w-full flex justify-center items-center'>
									<div className='w-8 h-8 border-4 border-cyan rounded-full
									border-b-gray-200 animate-spin' role='status'/>
									<span className='ml-2'>Searching...</span>
								</div>
						}
					</ul>
					: null
			}
		</>
	)
}

const Search = () => {


	let { getSearchResult } = useContext(CryptoContext);

	const debounceFunc = debounce(function (val) {
		getSearchResult(val);
	}, 2000)


	return (
		<div className='relative'>
			<SearchInput handlSearch={debounceFunc} />
		</div>
	)
}

export default Search
