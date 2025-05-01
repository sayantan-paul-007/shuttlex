import React from 'react'
import Logo from '../assets/logo.svg'
const Hero = () => {
  return (
    <section className='px-4 w-full mobile:px-5 tablet:px-6 laptop:px-8 desktop:px-12 desktop-large:px-16 desktop-xl:px-24 desktop-4k:px-32  text-white h-[90vh] desktop-xl:h-[80vh] desktop-2k:h-[70vh] bg-hero-img bg-cover bg-center '>
      
      <div className='container flex flex-col  h-[60%] justify-between gap-y-10'>
        <div>
           <img src={Logo} className='aspect-square h-32 desktop-xl:h-48 desktop-2k:h-64 desktop-4k:h-80' alt="" />

        </div>
       <div>
        <h1 className='text-2xl tablet:text-4xl desktop-large:text-5xl desktop-2k:text-7xl desktop-4k:text-9xl font-headingFont pb-3  desktop-large:pb-6'>
        SHUTTLEX — Explore the Future of Space Travel

      </h1>
      <p className='font-body text-md tablet:text-lg desktop-large:text-xl desktop-2k:text-3xl desktop-4k:text-5xl h-[50%]'>Dive into real-time SpaceX data, stunning visuals, and mission insights — all in one sleek dashboard built for space enthusiasts.
      </p>
      
       </div>
       <div>
        <button className='my-4 laptop:my-6  desktop-4k:my-12 px-4 laptop:px-6  desktop-4k:px-12 py-3 laptop:py-4  desktop-4k:py-9 font-body border desktop-xl:border-2 desktop-2k:border-4 desktop-4k:border-6 rounded-lg desktop-2k:rounded-3xl hover:rounded-none text-sm tablet:text-md desktop-large:text-lg desktop-2k:text-2xl desktop-4k:text-4xl'>
        <a href="#main-content">Explore more</a>
        
        </button>
       </div>

      
      </div>

      
    </section>
  )
}

export default Hero