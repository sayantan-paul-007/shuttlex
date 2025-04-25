import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Capsules' },
    { path: '/cores', label: 'Cores' },
    { path: '/crew', label: 'Crew' },
    { path: '/dragons', label: 'Dragons' },
    { path: '/landpads', label: 'Landpads' },
    { path: '/launches', label: 'Launches' },
    { path: '/launchpads', label: 'Launchpads' },
    { path: '/payloads', label: 'Payloads' },
    { path: '/rockets', label: 'Rockets' },
    { path: '/ships', label: 'Ships' },
    { path: '/starlink', label: 'Starlink' },
  ];

  return (
    <nav className='w-full bg-black text-white'>
      <ul className='flex flex-row flex-wrap gap-2'>
        {navItems.map(item => (
          <li key={item.path}>
            <Link to={item.path}>
              <button
                className={`rounded-full p-4 transition duration-300 ${
                  location.pathname === item.path
                    ? 'bg-orange-300 text-white'
                    : 'bg-transparent hover:bg-orange-100'
                }`}
              >
                {item.label}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
