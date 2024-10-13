import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Options } from 'sequelize';
import process from 'process';
import config from '../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db: any = {};

export let sequelize: Sequelize;

// Retrieve the current environment's configuration
const currentConfig = config[env];


if (currentConfig.use_env_variable) {
  // Retrieve the database URL from the environment variable
  const dbUrl = process.env[currentConfig.use_env_variable];


  // Check if the database URL is valid
  if (!dbUrl) {
    throw new Error(`Database URL not found for environment variable: ${currentConfig.use_env_variable}`);
  }

  // Use the URI from the environment variable
  sequelize = new Sequelize(dbUrl, {
    dialect: currentConfig.dialect as Options['dialect'],
    logging: false, // Optional: turn off logging if not needed
  });
} else {
  // Use the traditional method to initialize with database details
  sequelize = new Sequelize(currentConfig.database, currentConfig.username, currentConfig.password, {
    host: currentConfig.host,
    dialect: currentConfig.dialect as Options['dialect'],
    port: currentConfig.port,
    logging: false, // Optional: turn off logging if not needed
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
    const initializedModel = model(sequelize, DataTypes);
    db[initializedModel.name] = initializedModel;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

// Call initModels() to initialize models dynamically
initModels().then(() => {
  console.log('Models initialized successfully');
}).catch((err) => {
  console.error('Error initializing models:', err);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
