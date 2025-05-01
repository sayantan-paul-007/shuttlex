import React from 'react'

const Filter = ({children}) => {
  return (
    <div className="flex flex-col justify-center mobile:flex-row gap-4  text-white">
        {children}
    </div>
  )
}

export default Filter