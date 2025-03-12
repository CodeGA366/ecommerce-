import React from 'react';
import Home from '../components/Home';

const HomePage: React.FC = () => {
  console.log('HomePage component rendered');

  const user = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    products: [],
    sales: []
  };

  console.log('User in HomePage:', user);

  return (
    <div>
      <Home user={user} />
    </div>
  );
};

export default HomePage;