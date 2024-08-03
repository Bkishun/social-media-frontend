// Navbar.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/image/weblogo.png';
import User from './User';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';

export default function Navbar() {
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {}, []);

  return (
    <>
      <header className="shadow sticky z-50 top-0">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <button onClick={toggleSidebar} className="flex items-center focus:outline-none">
              <img src={logo} className="mr-3 h-12" alt="Logo" />
            </button>
            <div className="flex items-center lg:order-2">
              {loginStatus ? (
                <User />
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? 'text-orange-700' : 'text-gray-700'
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 font-medium`
                  }
                >
                  Log in
                </NavLink>
              )}
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <SearchBar />
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}
