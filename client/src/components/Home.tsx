import React from 'react';
import { User } from '../types';

interface HomeProps {
  user: User;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  console.log('Home component rendered');
  console.log('User:', user);

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <h2>Your Products</h2>
      <div>
        {user.products.length > 0 ? (
          user.products.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <h2>Your Sales</h2>
      <div>
        {user.sales.length > 0 ? (
          user.sales.map((sale) => (
            <div key={sale.id}>
              <h3>{sale.productId}</h3>
              <p>Sold for: ${sale.amount}</p>
            </div>
          ))
        ) : (
          <p>No sales found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;