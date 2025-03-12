import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/add-product">Add Products</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <button onClick={onLogout}>Sign Out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;