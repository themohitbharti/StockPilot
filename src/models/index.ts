
import {Sequelize } from 'sequelize';
import Product from './product';

import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE!, process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as any,
});

const db = {
    sequelize,
    Sequelize,
    Product: Product(sequelize),
};

export default db;
