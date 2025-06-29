import React from 'react';
import './Navbar.css';
import AvatarGroup from '../AvatarGroup';
import estimooLogo from '../../assets/estimoo.svg';


const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg px-4 py-2">
      <div className="navbar-start">
        <a className=" text-xl font-bold flex items-center gap-2 ml-4">
          <img src={estimooLogo} alt="Estimoo" className="h-8 w-auto" />
        
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a className="hover:bg-primary hover:text-primary-content rounded-lg">Home</a></li>
          <li><a className="hover:bg-primary hover:text-primary-content rounded-lg">Features</a></li>
          <li><a className="hover:bg-primary hover:text-primary-content rounded-lg">Pricing</a></li>
          <li><a className="hover:bg-primary hover:text-primary-content rounded-lg">Contact</a></li>
        </ul>
      </div>
      <div className="navbar-end gap-4">
        <AvatarGroup />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><a>Rename</a></li>
            <li><a>Leave Room</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;