// Sidebar.jsx
import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const sidebarRef = useRef();

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <nav className="mt-16">
        <ul>
          <li>
            <NavLink to="/createPost" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
              Create
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/likedVideos" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
              Liked Videos
            </NavLink>
          </li>
          <li>
            <NavLink to="/playlist" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
              Playlist
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100">
              History
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
