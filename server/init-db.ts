import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize('postgres://postgres:Fluglehorn7@localhost:5432/postgres', {
  dialect: 'postgres',
  logging: false,
});

const createDatabase = async () => {
  try {
    await sequelize.query(`CREATE DATABASE ecommerce;`);
    console.log('Database "ecommerce" created successfully.');
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await sequelize.close();
  }
};

createDatabase();