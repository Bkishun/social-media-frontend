import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

// Function to generate a color from a string
const generateColorFromString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

function User() {
  const [isOpen, setIsOpen] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const menuRef = useRef(null); // Reference to the menu div

  // Generate a color based on the username
  const circleColor = userData ? generateColorFromString(userData.username) : '#cccccc';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChangePassword = () => {
    navigate('/change-password'); // Assuming you have a route for this
  };

  const handleProfile = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!userData) return null;

  const firstLetter = userData.username ? userData.username.charAt(0).toUpperCase() : '';

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
        style={{ backgroundColor: circleColor, color: '#fff' }}
        onClick={toggleMenu}
      >
        {firstLetter}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          <button
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleProfile}
          >
            My Profile
          </button>
          <button
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
          <Logout />
        </div>
      )}
    </div>
  );
}

export default User;
