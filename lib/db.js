import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost', 
    user: process.env.DB_USER || 'root',     
    password: process.env.DB_PASS || '',     
    database: process.env.DB_NAME || 'paradise_express_thailand', 
    waitForConnections: true,
    connectionLimit: 10,
});
