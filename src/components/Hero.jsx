import React from 'react'
import Logo from '../assets/logo.svg'
const Hero = () => {
  return (
    <section className='bg-black px-28 text-white h-max'>
      <div>
        <img src={Logo} className='aspect-square h-32' alt="" />
      </div>
      <h1 className='text-5xl font-headingFont'>
        SHUTTLEX - The mini SpaceX
      </h1>
      <p>The ultimate guide of SpaceX missions</p>
      <button className='burr'>explore more</button>
    </section>
  )
}

export default Hero