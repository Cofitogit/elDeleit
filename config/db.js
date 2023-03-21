const mysql = require('mysql2/promise');
import {config} from 'dotenv';
config()

const connectToDatabase = async () => {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  console.log('Connected to PlanetScale!');
  return connection;
}

export { connectToDatabase };
