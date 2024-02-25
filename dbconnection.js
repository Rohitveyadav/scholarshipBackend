const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '159.223.48.95',
    port: 3306,
    user: 'coding-challenge',
    password: 'T18SZMMkn84YR0jkDj7fiZcN0dmzpL5d',
    database: 'mock_project',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool
    .getConnection()
    .then((connection) => {
        console.log('Connected to MySQL database!');
        connection.release();
    })
    .catch((error) => {
        console.error('Error connecting to MySQL database:', error);
    });

module.exports = pool;