import React,{useContext} from 'react'
import { SearchContext } from '../context/SearchContext'

const Search = ({placeholder}) => {
    const {search, setSearch} = useContext(SearchContext)
  return (
    <div className='bg-black'>
      <input
    type="text"
    placeholder={placeholder}
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border p-2 rounded bg-black"
  />
    </div>
    
  )
}

export default Search