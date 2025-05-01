import React from 'react'

const Grid = ({children}) => {
return (
    <section className='grid grid-cols-1 place-items-center mobile:grid-cols-2 desktop:grid-cols-3 desktop-4k:grid-cols-4 gap-6 caret-transparent'>
        {children}
    </section>
  )
}

export default Grid