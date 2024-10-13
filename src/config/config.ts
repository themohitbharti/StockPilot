import dotenv from 'dotenv';

dotenv.config();

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
  port: number;
  use_env_variable?: string; // Optional if you want to use env variable
}

const config: { [key: string]: DBConfig } = {
  development: {
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
    host: process.env.DB_HOST as string,
    dialect: process.env.DB_DIALECT as string,
    port: parseInt(process.env.DB_PORT as string, 10),
    use_env_variable: 'DB_URL', // Use the name of the env variable, not the value
  },
};

export default config;
