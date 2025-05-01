import React,{useContext} from 'react'
import { SearchContext } from '../context/SearchContext'

const Search = ({placeholder}) => {
    const {search, setSearch} = useContext(SearchContext)
  return (
    <div className='flex justify-center' >
      <input
    type="text"
    placeholder={placeholder}
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border w-full mobile:w-[80%]  p-2 m-2 laptop:m-0 rounded bg-[#0F1112] text-white"
  />
    </div>
    
  )
}

export default Search