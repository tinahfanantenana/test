import mysql from 'mysql2/promise';

// Create the connection to database
export const connection = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:'1234',
  database: 'LivreDor',
  waitForConnections: true,
  connectionLimit: 10
});

