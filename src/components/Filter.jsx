import React from 'react'

const Filter = ({children}) => {
  return (
    <div className="flex gap-4 bg-black">
        {children}
    </div>
  )
}

export default Filter