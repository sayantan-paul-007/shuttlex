import React from 'react'
import '../assets/css/styles.css'
const Hero = ({children}) => {
  return (
    <section className='hero'>
      {children}
    </section>
  )
}

export default Hero
