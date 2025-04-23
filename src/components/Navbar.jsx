import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className=' w-full'>
      <ul className='flex flex-row'>
        <li><button className='rounded-full bg-orange-300 p-4'><Link to="/">Capsules</Link></button></li>
        <li><button className='rounded-full bg-orange-300 p-4'><Link to="/cores">Cores</Link></button></li>
        <li><button className='rounded-full bg-orange-300 p-4'><Link to="/crew">Crew</Link></button></li>
        <li><button className='rounded-full bg-orange-300 p-4'><Link to="/dragons">Dragons</Link></button></li>
        <li><button className='rounded-full bg-orange-300 p-4'><Link to="/landpads">Landpads</Link></button></li>
        <li><button className='rounded-full bg-orange-300 p-4'><Link to="/launches">Launches</Link></button></li>
        <li><button className='rounded-full bg-orange-300 p-4'><Link to="/launchpads">Launchpads</Link></button></li>
        <li><button className='rounded-full bg-orange-300 p-4'><Link to="/payloads">Payloads</Link></button></li>
        <li><button className='rounded-full bg-orange-300 p-4'><Link to="/rockets">Rockets</Link></button></li>
        <li><button className='rounded-full bg-orange-300 p-4'><Link to="/ships">Ships</Link></button></li>
        <li><button className='rounded-full bg-orange-300 p-4'><Link to="/starlink">Starlink</Link></button></li>
      </ul>
    </nav>
  )
}

export default Navbar