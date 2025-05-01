import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar'
import Capsules from '../pages/Capsules'
import Cores from "../pages/Cores";
import Crew from "../pages/Crew";
import Dragons from "../pages/Dragons";
import Landpads from "../pages/Landpads";
import Launches from "../pages/Launches";
import Launchpads from "../pages/Launchpads";
import Payloads from "../pages/Payloads";
import Rockets from "../pages/Rockets";
import Ships from "../pages/Ships";
import Starlink from "../pages/Starlink";
import NotFound from "../pages/NotFound";
const AppComponent = () => {
  return (
   <section className=' px-4 mobile:px-5 tablet:px-6 laptop:px-8 desktop:px-12 desktop-large:px-16 desktop-xl:px-24 desktop-4k:px-28 '>
   <div className=' flex flex-col  desktop:flex-row container'>
    
   
   <Navbar />
    <div className='basis-[80%] desktop:basis-[85%]'>
        <Routes>
          <Route path="/" element={<Capsules />} />
          <Route path="/cores" element={<Cores />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/dragons" element={<Dragons />} />
          <Route path="/landpads" element={<Landpads />} />
          <Route path="/launches" element={<Launches />} />
          <Route path="/launchpads" element={<Launchpads />} />
          <Route path="/payloads" element={<Payloads />} />
          <Route path="/rockets" element={<Rockets />} />
          <Route path="/ships" element={<Ships />} />
          <Route path="/starlink" element={<Starlink />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
   </div>
        
   </section>
  )
}

export default AppComponent