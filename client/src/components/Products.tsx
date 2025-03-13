import React, { useEffect, useState } from 'react';
import { fetchProducts, buyProduct } from '../services/api';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleBuyProduct = async (productId: string) => {
    try {
      await buyProduct(productId);
      // Update the product list after purchase
      setProducts(products.map(product => product.id === productId ? { ...product, sold: true } : product));
    } catch (err) {
      setError('Failed to buy product');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Available Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 bg-white rounded-lg shadow-md">
            {product.imageUrl && (
              <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
            )}
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-gray-900 font-bold">${product.price}</p>
            {!product.sold && user?.id !== product.userId && (
              <button
                onClick={() => handleBuyProduct(product.id)}
                className="w-full px-4 py-2 mt-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Buy
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;