import React, { useState } from 'react';
import AddProduct from '../components/AddProduct';

const AddProductPage: React.FC = () => {
    const [productAdded, setProductAdded] = useState(false);

    const handleProductAdded = () => {
        setProductAdded(true);
    };

    return (
        <div>
            <AddProduct onProductAdded={handleProductAdded} />
            {productAdded && <p>Product added successfully!</p>}
        </div>
    );
};

export default AddProductPage;