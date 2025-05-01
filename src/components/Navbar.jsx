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
    <nav className='text-white basis-[20%] text-sm  desktop:basis-[15%] '>
      <ul className='flex flex-row justify-center desktop:flex-col desktop:text-md desktop-xl:text-lg desktop-2k:text-2xl py-4 px-3 flex-wrap gap-2'>
        {navItems.map(item => (
          <li className={`${
                  location.pathname === item.path
                    ? 'bg-cyan-700 text-white'
                    : 'bg-transparent hover:outline hover:outline-cyan-400'
                } rounded-lg p-3 transition duration-300 desktop:w-full`} key={item.path}>
            <Link to={item.path}>
              <button
                className={` `}
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
