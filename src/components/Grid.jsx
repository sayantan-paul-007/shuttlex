import React from 'react'

const Grid = ({children}) => {
return (
    <section className='grid grid-cols-3 gap-6 '>
        {children}
    </section>
  )
}

export default Grid