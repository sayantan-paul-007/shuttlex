import React, { useState, createContext } from 'react'
export const FilterContext = createContext()
export const FilterProvider = ({children}) => {
  const [capsuleFilter, setCapsuleFilter]=useState({
    'status':'',
    'reuse_count':''
  })

  return (
     <FilterContext.Provider value={{ capsuleFilter, setCapsuleFilter }}>
      {children}
    </FilterContext.Provider>
  )
}

