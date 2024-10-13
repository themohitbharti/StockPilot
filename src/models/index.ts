import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Options } from 'sequelize';
import process from 'process';
// import config from '../config/config';
const config = require('../config/config.js');
import Product from './product';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db: any = {};

export let sequelize: Sequelize;

const currentConfig = config[env];

if (currentConfig.use_env_variable) {
  const dbUrl = process.env[currentConfig.use_env_variable];

  if (!dbUrl) {
    throw new Error(`Database URL not found for environment variable: ${currentConfig.use_env_variable}`);
  }

  sequelize = new Sequelize(dbUrl, {
    dialect: currentConfig.dialect as Options['dialect'],
    logging: false,
  });
} else {
  sequelize = new Sequelize(currentConfig.database, currentConfig.username, currentConfig.password, {
    host: currentConfig.host,
    dialect: currentConfig.dialect as Options['dialect'],
    port: currentConfig.port,
    logging: false,
  });
}

const initModels = async () => {
  const modelFiles = fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.ts' &&
        file.indexOf('.test.ts') === -1
      );
    });

  for (const file of modelFiles) {
    const { default: model } = await import(path.join(__dirname, file));
    const initializedModel = model(sequelize);
    db[initializedModel.name] = initializedModel;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

initModels()
  .then(() => {
    console.log('Models initialized successfully');
  })
  .catch((err) => {
    console.error('Error initializing models:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
