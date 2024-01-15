import React, { useContext, useRef } from 'react'
import paginationArrow from '../assets/pagination-arrow.svg'
import { CryptoContext } from '../context/CryptoContext';
import submitIcon from '../assets/submit-icon.svg'

const PerPage = () => {

  const { setPerPage } = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handlSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  }

  return (
    <form action="" className='relative flex items-center font-nunito
					mr-12'
      onSubmit={handlSubmit}
    >
      <label htmlFor="perPage" className='
                    flex relative items-center justify-center mr-2 font-bold'>Per Page{" "}</label>
      <input ref={inputRef} type="number" min={1} max={250} name='perPage'
        placeholder='10' className='w-16 rounded bg-gray-200
                        placeholder:text-gray-100 pl-2 required outline-none
                        border border-transparent focus:border-cyan leading-4'
      />
      <button type='submit' className='ml-1 cursor-pointer' >
        <img src={submitIcon} alt="submit" className='w-full
        h-auto' />
      </button>
    </form>
  )
}

const Pagination = () => {

  let { page, setPage, totalPage, perPage,cryptoData } = useContext(CryptoContext);

  const totalNumber = Math.ceil(totalPage / perPage);

  const next = () => {
    if (page === totalNumber) {
      return null;
    } else setPage(page + 1);
  }
  const prev = () => {
    if (page === 1) {
      return null;
    } else setPage(page - 1);
  }
  const multiStepNext = () => {
    if (page + 3 >= totalNumber) {
      setPage(totalNumber - 1);
    } else setPage(page + 3);
  }
  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(page);
    } else setPage(page - 2);
  }

  if (cryptoData && cryptoData.length >= perPage) {
    return (
      <div className='flex items-center'>
        <PerPage />
        <ul className='flex items-center justify-end text-sm'>
          <li className='flex items-center'>
            <button
              onClick={prev}
              className='outline-none hover:text-cyan w-8'>
              <img
                className='w-full h-auto rotate-180'
                src={paginationArrow} alt="left" />
            </button>
          </li>
          {
            (page + 1 === totalNumber || page === totalNumber) ?
              <li>
                {' '}
                <button onClick={multiStepPrev}
                  className='outline-none hover:text-cyan 
              rounded-full w-8 h-8 items-center 
              justify-center text-lg'
                >...</button>
              </li>
              : null
          }
          {
            (page - 1 !== 0) ?
              <li>
                <button onClick={prev} className='outline-none bg-gray-200 mx-1.5 hover:text-cyan rounded-full w-8 h-8 items-center justify-center'>{" "}{page - 1}{" "}</button>
              </li>
              : null
          }
          <li>
            <button disabled className='outline-none bg-cyan text-gray-300 mx-1.5 rounded-full w-8 h-8 items-center justify-center'>{page}</button>
          </li>
          {
            (page + 1 !== totalNumber && page !== totalNumber) ?
              <li>
                <button onClick={next} className='outline-none bg-gray-200 mx-1.5 hover:text-cyan rounded-full w-8 h-8 items-center justify-center'>{page + 1}</button>
              </li>
              : null
          }
          {
            page + 1 !== totalNumber && page !== totalNumber ?
              <li>
                {' '}
                <button onClick={multiStepNext}
                  className='outline-none hover:text-cyan 
              rounded-full w-8 h-8 items-center 
              justify-center text-lg'
                >...</button>
              </li>
              : null
          }
          {
            page !== totalNumber ?
              <li>
                <button onClick={() => setPage(totalNumber)} className='outline-none bg-gray-200 mx-1.5 
            hover:text-cyan rounded-full w-8 h-8 items-center
            justify-center'
                >{totalNumber}</button>
              </li>
              : null
          }
          <li className='flex items-center'>
            <button
              onClick={next}
              className='outline-none hover:text-cyan w-8'>
              <img
                className='w-full h-auto'
                src={paginationArrow} alt="right" />
            </button>
          </li>
        </ul>
      </div>
    )
  } else {
    return null;
  }
}

export default Pagination
