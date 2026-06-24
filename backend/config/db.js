const mysql = require('mysql2/promise');

const poolConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create a connection pool that doesn't specify a database initially,
// allowing us to switch databases dynamically per request using connection.query(`USE ${db}`)
const pool = mysql.createPool(poolConfig);

module.exports = pool;
