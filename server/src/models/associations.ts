import Product from './Product';
import Sale from './Sales';
import User from './User';

// Define associations
User.hasMany(Product, { foreignKey: 'userId', as: 'products' });
Product.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(Sale, { foreignKey: 'productId', as: 'sales' });
Sale.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

Sale.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });