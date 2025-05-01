import React from 'react'

const Grid = ({children}) => {
return (
    <section className='grid grid-cols-1 place-items-center mobile:grid-cols-2 desktop:grid-cols-3 desktop-2k:grid-cols-4 desktop-4k:grid-cols-6  text-sm   gap-6 caret-transparent'>
        {children}
    </section>
  )
}

export default Grid