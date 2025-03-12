import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div>
      <h1>Profile</h1>
      <h2>Welcome, {user.name}!</h2>
      <h3>Your Products</h3>
      <ul>
        {user.products.length > 0 ? (
          user.products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))
        ) : (
          <li>No products listed.</li>
        )}
      </ul>
      <h3>Your Sales</h3>
      <ul>
        {user.sales.length > 0 ? (
          user.sales.map((sale) => (
            <li key={sale.id}>{sale.amount}</li>
          ))
        ) : (
          <li>No sales recorded.</li>
        )}
      </ul>
    </div>
  );
};

export default Profile;