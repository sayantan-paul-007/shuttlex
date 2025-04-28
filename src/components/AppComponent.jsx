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
   <section className='bg-black w-full flex flex-row'>
   <Navbar />
    <div className='basis-[80%]'>
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
   
        
   </section>
  )
}

export default AppComponent