import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/home">E-commerce</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/products" className="text-white hover:text-gray-300">Products</Link>
          </li>
          <li>
            <Link to="/add-product" className="text-white hover:text-gray-300">Add Products</Link>
          </li>
          {user ? (
            <li>
              <button onClick={handleLogout} className="text-white hover:text-gray-300">Sign Out</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;