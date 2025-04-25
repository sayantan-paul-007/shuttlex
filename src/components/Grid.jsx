import React from 'react'

const Grid = ({children}) => {
return (
    <section className='grid grid-cols-3 gap-4 bg-black'>
        {children}
    </section>
  )
}

export default Grid