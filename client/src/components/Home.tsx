import React, { useEffect, useState } from 'react';
import { fetchUserProducts } from '../services/api';
import { User, Product } from '../types';

interface HomeProps {
  user: User;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserProducts = async () => {
      try {
        const data = await fetchUserProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    getUserProducts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
      <h2 className="text-2xl font-semibold mb-2">Your Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-900 font-bold">${product.price}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No products found.</p>
        )}
      </div>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Your Sales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user.sales.length > 0 ? (
          user.sales.map((sale) => (
            <div key={sale.id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Product ID: {sale.productId}</h3>
              <p className="text-gray-900 font-bold">Sold for: ${sale.amount}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No sales found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;